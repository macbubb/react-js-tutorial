import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board';
import { calculateWinner, calculateRowCol } from './helpers.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      lastMove: []
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastMove = this.state.lastMove.push(calculateRowCol(i));

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    /*const previousMove = (current != 0) ? this.state.history[this.state.stepNumber - 1] : '';

    const printMove ='';
    const previousMove = this.state.history[(this.state.stepNumber - 1)];


    let i = 0;
    if (current != 0) {
      if (current.squares[i] == previousMove.squares[i]) {
        i++;
      }
      else {
        switch(i){
          case 0:
            printMove = '(1, 1)';
            break;
          case 1:
            printMove = '(1, 2)';
            break;
          case 2:
            printMove = '(1, 3)';
            break;
          case 3:
            printMove = '(2, 1)';
            break;
          case 4:
            printMove = '(2, 2)';
            break;
          case 5:
            printMove = '(2, 3)';
            break;
          case 6:
            printMove = '(3, 1)';
            break;
          case 7:
            printMove = '(3, 2)';
            break;
          case 8:
            printMove = '(3, 3)';
            break;
          default:
            console.log('something went wrong finding the last move');
          }
        }
      }
    else {

    }
*/
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span> Prior Move: {this.state.history[current]}</span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));


