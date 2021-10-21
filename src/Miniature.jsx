import React from "react";
import "./styles/Miniature.scss";

export default function Miniature(props) {
  const squares = props.data;

  const elements = squares.map((square, i) => {
    return <p key={"p" + i}>{square ? square : ""}</p>;
  });

  return (
    <button className="Miniature" onClick={props.onClick}>
      {elements}
    </button>
  );
}
