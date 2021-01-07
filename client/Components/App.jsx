import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [],
      player: null,
      player1: 1,
      player2: 2,
      play: false,
      message: ''
    }
    this.createBoard = this.createBoard.bind(this);
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

      // handle all checks for wins, tie, continue, or done
      const res = this.checkAll(board);
      res === this.state.player1
      ? this.setState({ board, play: false, message: 'Player 1 wins!' })
      : res === this.state.player2
      ? this.setState({ board, play: false, message: 'Player 2 wins!' })
      : res === 'stalemate'
      ? this.setState({ board, play: false, message: 'Stalemate!' })
      : this.setState({ board, player: this.togglePlayer() })
    } else {
      this.setState({ message: 'Game over! New Game?' })
    }
  }

  checkVertical(board) {
    // skip first 3 rows
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            return board[r][c];    
          }
        }
      }
    }
  }
  
  checkHorizontal(board) {
    // skip last two columns
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalRight(board) {
    // skip first 3 rows, last 2 columns
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board) {
    // skip first 3 rows, first 3 columns
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === 0) {
          return 0;
        }
      }
    }
    return 'stalemate';    
  }
  
  checkAll(board) {
    // 
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }

  render() {
    return (
      <>
        <h1>CONNECT FOUR</h1>
        <table>
          <thead></thead>
          <tbody>
            {
              this.state.board.map((row, i) => 
                <Row key={i} row={row} processTurn={ this.processTurn } />
              )
            }
          </tbody>
        </table>
        <button onClick={() => { this.createBoard() }}>New Game</button>
        <div className="message">{ this.state.message }</div>
      </>
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
