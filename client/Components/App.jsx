import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [],
      player: null,
      player1: 1,
      player2: 2
    }
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
      player: this.state.player1
    })
  }

  togglePlayer() {
    return this.state.player === 1 ? this.state.player2 : this.state.player1; 
  }

  render() {
    return (
      <table>
        <thead></thead>
        <tbody>
          {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
        </tbody>
      </table>
    )
  }
}

const Row = ({row}) => 
  <tr>
    {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} />)}
  </tr>

const Cell = ({value, columnIndex}) =>
  <td className="cell" onClick={() => console.log('clicked!', columnIndex)}>
  </td>
