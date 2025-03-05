import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import Board from "./Board";
import {
  GameContainer,
  GameInfo,
  Status,
  ScoreBoard,
  Score,
  ResetButton,
  Title,
  GameModeButton,
  DifficultyContainer,
  DifficultyButton,
} from "../styles/StyledComponents";
import {
  calculateWinner,
  isBoardFull,
  getInitialState,
  handleMove,
} from "../utils/gameLogic";
import { findBestMove } from "../utils/aiLogic";

const Game = () => {
  const [gameState, setGameState] = useState(getInitialState());
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const [difficulty, setDifficulty] = useState("hard");

  useEffect(() => {
    if (gameState.winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState.winner]);

  const makeAIMove = () => {
    const aiMove = findBestMove(gameState.squares, false, difficulty);
    if (aiMove !== null) {
      const newSquares = handleMove(gameState.squares, aiMove, false);
      const winner = calculateWinner(newSquares);
      const draw = !winner && isBoardFull(newSquares);

      setGameState((prev) => ({
        ...prev,
        squares: newSquares,
        xIsNext: true,
        winner,
        isDraw: draw,
        score: winner
          ? {
              ...prev.score,
              [winner]: prev.score[winner] + 1,
            }
          : prev.score,
        gameHistory: [
          ...prev.gameHistory,
          {
            squares: newSquares,
            winner,
            isDraw: draw,
          },
        ],
      }));
    }
  };

  useEffect(() => {
    if (
      isAIMode &&
      !gameState.xIsNext &&
      !gameState.winner &&
      !gameState.isDraw
    ) {
      const timer = setTimeout(makeAIMove, 500);
      return () => clearTimeout(timer);
    }
  }, [
    isAIMode,
    gameState.xIsNext,
    gameState.winner,
    gameState.isDraw,
    difficulty,
  ]);

  const handleClick = (index) => {
    if (isAIMode && !gameState.xIsNext) return; // Prevent player from moving during AI's turn

    const newSquares = handleMove(gameState.squares, index, gameState.xIsNext);
    const winner = calculateWinner(newSquares);
    const draw = !winner && isBoardFull(newSquares);

    setGameState((prev) => ({
      ...prev,
      squares: newSquares,
      xIsNext: !prev.xIsNext,
      winner,
      isDraw: draw,
      score: winner
        ? {
            ...prev.score,
            [winner]: prev.score[winner] + 1,
          }
        : prev.score,
      gameHistory: [
        ...prev.gameHistory,
        {
          squares: newSquares,
          winner,
          isDraw: draw,
        },
      ],
    }));
  };

  const resetGame = () => {
    setGameState(getInitialState());
  };

  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  const setDifficultyLevel = (level) => {
    setDifficulty(level);
    resetGame();
  };

  const getStatus = () => {
    if (gameState.winner) {
      return `Winner: ${gameState.winner}`;
    }
    if (gameState.isDraw) {
      return "It's a draw!";
    }
    if (isAIMode) {
      return gameState.xIsNext ? "Your turn" : "AI is thinking...";
    }
    return `Next player: ${gameState.xIsNext ? "X" : "O"}`;
  };

  return (
    <GameContainer>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Title>Tic Tac Toe</Title>
      <GameModeButton onClick={toggleAIMode}>
        {isAIMode ? "Switch to Two Player" : "Play against AI"}
      </GameModeButton>
      {isAIMode && (
        <DifficultyContainer>
          <DifficultyButton
            active={difficulty === "easy"}
            onClick={() => setDifficultyLevel("easy")}
          >
            Easy
          </DifficultyButton>
          <DifficultyButton
            active={difficulty === "medium"}
            onClick={() => setDifficultyLevel("medium")}
          >
            Medium
          </DifficultyButton>
          <DifficultyButton
            active={difficulty === "hard"}
            onClick={() => setDifficultyLevel("hard")}
          >
            Hard
          </DifficultyButton>
        </DifficultyContainer>
      )}
      <Board
        squares={gameState.squares}
        onClick={handleClick}
        disabled={
          !!gameState.winner ||
          gameState.isDraw ||
          (isAIMode && !gameState.xIsNext)
        }
      />
      <GameInfo>
        <Status>{getStatus()}</Status>
        <ScoreBoard>
          <Score>Player X: {gameState.score.X}</Score>
          <Score>Player O: {gameState.score.O}</Score>
        </ScoreBoard>
        <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      </GameInfo>
    </GameContainer>
  );
};

export default Game;
