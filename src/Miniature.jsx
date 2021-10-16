import React from "react";
import "./styles/Miniature.scss";

export default function Miniature(props) {
  const squares = props.data;

  const elements = squares.map((square) => {
    return <p>{square ? square : ""}</p>;
  });

  return (
    <button className="Miniature" onClick={props.onClick}>
      {elements}
    </button>
  );
}
