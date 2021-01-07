import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [],
      player: null,
      player1: 1,
      player2: 2,
      play: false
    }
    this.processTurn = this.processTurn.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    const board = []
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(0)
      }
      board.push(row);
    }
    this.setState({
      board,
      player: this.state.player1,
      play: true
    })
  }

  togglePlayer() {
    return this.state.player === 1 ? this.state.player2 : this.state.player1; 
  }

  processTurn(col) {
    if (this.state.play) {
      let board = this.state.board;
      for (let row = 5; row >=0; row--) {
        if (!board[row][col]) {
          board[row][col] = this.state.player;
          break;
        }
      }
      this.setState({ board, player: this.togglePlayer() })
    }
  }

  render() {
    return (
      <table>
        <thead></thead>
        <tbody>
          {this.state.board.map((row, i) => (<Row key={i} row={row} processTurn={this.processTurn} />))}
        </tbody>
      </table>
    )
  }
}

const Row = ({row, processTurn}) => 
  <tr>
    {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} processTurn={processTurn} />)}
  </tr>

const Cell = ({value, columnIndex, processTurn}) => 
  <td className={
    value === 1
    ? 'red'
    : value === 2
    ? 'yellow'
    : 'white'
   } onClick={() => processTurn(columnIndex)}>

  </td>
