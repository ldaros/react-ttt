import React, { Component } from "react";
import "./styles/Game.scss";
import Board from "./Board";
import Miniature from "./Miniature";

export default class Game extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      history: [{ squares: Array(9).fill(null) }], // game history
      xIsNext: true, // who's turn is it? x = true, o = false
      stepNumber: 0, // current move
      historyOrder: false, // order the display of history true = descending, false = ascending, this feature is kinda unessessary, but whatever
    };
  }

  // change the order of the history
  sortHistory(order) {
    this.setState({
      historyOrder: order,
    });
  }

  // jump to a specific move in the game history and update the state accordingly.
  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  // handle click on a square in the board and update the state accordingly.
  handleClick(i) {
    // copy the history up to the current move (stepNumber) and add the new move to the end of the array
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]; // get the current move
    const squares = current.squares.slice(); // copy the squares array from the current move

    // if the square is already occupied, return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // update the squares array with the new move
    squares[i] = this.state.xIsNext ? "X" : "O";

    // update the state with the new history and the new squares array
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length, // update the current move
      xIsNext: !this.state.xIsNext, // update the turn
    });
  }

  render() {
    let history = this.state.history; // get the history
    const sort = this.state.historyOrder; // to sort or not to sort, that is the question
    const current = history[this.state.stepNumber]; // get the current move
    const winner = calculateWinner(current.squares); // get the winner, if any

    // if sort is true, reverse history and leave the first move unchanged
    if (sort) {
      const first = history.slice(0, 1);
      let second = history.slice(1, history.length);
      second = second.reverse();
      const reversedHistory = first.concat(second);
      history = reversedHistory;
    }

    // create a list of moves in the game history
    const moves = history.map((step, move) => {
      let miniToColor = this.state.stepNumber; // color the current move, (it colors the selected too, i didn't intend to do that, but why not?)

      // if sort is true, color the first move
      if (sort) {
        miniToColor = 1;
      }

      if (move) {
        // return a miniaturized version of the board
        return (
          <li key={move}>
            <Miniature
              onClick={() => this.jumpTo(move)}
              data={history[move].squares}
              current={miniToColor === move} // is it the current move?
            />
          </li>
        );
      } else
        return (
          // return a button to the start of the game
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {"Go to game start"}
            </button>{" "}
          </li>
        );
    });

    let status; // status message, that is displayed at the right of the board
    if (winner) {
      // if there is a winner
      status = "Winner: " + winner[0]; // set the status message to the win condition
    } else if (history.length === 10 && !calculateWinner(current.squares)) {
      // if there is no winner and the game is over (draw)
      status = "Draw";
    } else {
      // if there is no winner and the game is still in progress
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    // get the winning line, if any (array of the indexes of the squares that form the line)
    let win_line = calculateWinner(current.squares)
      ? calculateWinner(current.squares)[1]
      : null;

    // render everything
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={win_line}
          />{" "}
        </div>
        <div className="game-info">
          <p>{status}</p> <ol>{moves}</ol>{" "}
          <button onClick={() => this.sortHistory(!this.state.historyOrder)}>
            Sort
          </button>
        </div>
      </div>
    );
  }
}

// helper function to see if there is a winner
function calculateWinner(squares) {
  // all possible winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // loop through all the winning lines
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let winner = [squares[a], lines[i]];
      return winner; // Hooray! We have a winner!
    }
  }
  return null;
}

// Question: hey copilot, how good is this code?
// Answer: it's pretty good, but it's not perfect.
// Reply: neat, thanks!
