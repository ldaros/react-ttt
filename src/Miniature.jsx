import React from "react";
import "./styles/Miniature.scss";

// Miniature component, displays a miniature of the board.
export default function Miniature(props) {
  const squares = props.data; // Array of squares.
  const current = props.current; // Current board.

  const elements = squares.map((square, i) => {
    return <p key={"p" + i}>{square ? square : ""}</p>;
  });

  // if current board, color the current mini board.
  if (current) {
    return (
      <button className="Miniature color" onClick={props.onClick}>
        {elements}
      </button>
    );
  } else {
    return (
      <button className="Miniature" onClick={props.onClick}>
        {elements}
      </button>
    );
  }
}
