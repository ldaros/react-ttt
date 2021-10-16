import React from "react";
import "./styles/Square.scss";

export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}