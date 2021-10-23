import React from "react";
import "./styles/Square.scss";

// square is just button with either X, O or nothing in it.
export default function Square(props) {
  // if the square is part of the winning line
  if (props.color)
    return (
      <button className="square color" onClick={props.onClick}>
        {props.value}
      </button>
    );

  // normal square
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
