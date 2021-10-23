import React, { Component } from "react";
import "./styles/Board.scss";
import Square from "./Square";

export default class Board extends Component {
  // renderSquare function takes in a number and returns a square with the number as the value of the square.
  renderSquare(i) {
    let color;

    // if the square is a winning square, change the color of the square to red.
    if (this.props.winner != null && this.props.winner.includes(i)) {
      color = 1;
    } else color = 0;

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        color={color}
      />
    );
  }

  render() {
    // render 6 squares using the renderSquare function, use 2 loops.
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let cols = [];
      for (let j = 0; j < 3; j++) {
        cols.push(this.renderSquare(i * 3 + j));
      }
      rows.push(<div className="board-row">{cols}</div>);
    }
    return <div>{rows}</div>;
  }
}
