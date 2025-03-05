import React from "react";
import { Square as StyledSquare } from "../styles/StyledComponents";

const Square = ({ value, onClick, disabled }) => {
  return (
    <StyledSquare onClick={onClick} disabled={disabled} value={value}>
      {value}
    </StyledSquare>
  );
};

export default Square;
