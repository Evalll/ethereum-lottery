import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import { Button } from "react-bootstrap";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const owner = await lottery.methods.owner().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ owner, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "交易进行中..." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
    this.setState({ message: "您已下注成功！" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "交易进行中..." });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: "中奖人已选出！" });
  };

  render() {
    return (

      <div className="App">

        <div  className="title">
          <h1>基于智能合约的彩票系统</h1>
          <p>发起人：{this.state.owner}</p>
          <div className="info">
            <p>目前人数：{this.state.players.length}</p>
            <p>奖金：{web3.utils.fromWei(this.state.balance, "ether")} ether</p>
          </div>
        </div>

        <div className='rules'>
          <h4>玩法介绍</h4>
          <p>1. 玩家可通过下注参与游戏，最低投注 0.0001 ether；</p>
          <p>2. 系统随机选出一名玩家作为获胜者，获胜者将获得奖金池内所有奖励。</p>
        </div>

        <div>
          <form onSubmit={this.onSubmit}>
            <h4>试试你的运气吧!</h4>
            <div  className="lottery">
              <label>你的投注：</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
              />{" "}
              ether
            </div>
            <Button type="submit" bsStyle="success">
            下注
            </Button>
          </form>
        </div>

        <div className='winner'>
          <h4>准备好要开奖了吗？</h4>
          <Button className="buttonView" bsStyle="primary" onClick={this.onClick}>
            选出中奖人
          </Button>
          <h1>{this.state.message}</h1>
        </div>
      </div>
      
    );
  }
}

export default App;