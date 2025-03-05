import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Square = styled.button`
  width: 100px;
  height: 100px;
  background-color: #ecf0f1;
  border: none;
  border-radius: 5px;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${(props) =>
    props.value === "X"
      ? "#000000"
      : props.value === "O"
      ? "#e74c3c"
      : "inherit"};

  &:hover {
    background-color: #bdc3c7;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const GameInfo = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const Status = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

export const ScoreBoard = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

export const Score = styled.div`
  font-size: 1.2rem;
  color: #34495e;
`;

export const ResetButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

export const GameModeButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

export const DifficultyContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const DifficultyButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? "#2ecc71" : "#95a5a6")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#27ae60" : "#7f8c8d")};
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
`;
