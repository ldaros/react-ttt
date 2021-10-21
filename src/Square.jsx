import React from "react";
import "./styles/Square.scss";

export default function Square(props) {
  if (props.color)
    return (
      <button className="square color" onClick={props.onClick}>
        {props.value}
      </button>
    );

  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
