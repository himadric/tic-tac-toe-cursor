import React from "react";
import { GameBoard } from "../styles/StyledComponents";
import Square from "./Square";

const Board = ({ squares, onClick, disabled }) => {
  return (
    <GameBoard>
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          disabled={disabled}
        />
      ))}
    </GameBoard>
  );
};

export default Board;
