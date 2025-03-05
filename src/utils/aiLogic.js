export const findBestMove = (squares, isMaximizing, difficulty = "hard") => {
  const availableMoves = squares
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  if (availableMoves.length === 0) return null;

  // For easy mode, randomly choose a move
  if (difficulty === "easy") {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // For medium mode, mix between random and optimal moves
  if (difficulty === "medium") {
    const shouldMakeOptimalMove = Math.random() < 0.5;
    if (shouldMakeOptimalMove) {
      return findOptimalMove(squares, isMaximizing);
    } else {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
  }

  // For hard mode, always make optimal moves
  return findOptimalMove(squares, isMaximizing);
};

const findOptimalMove = (squares, isMaximizing) => {
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove = null;

  const availableMoves = squares
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  for (const move of availableMoves) {
    const newSquares = [...squares];
    newSquares[move] = isMaximizing ? "X" : "O";

    const score = minimax(newSquares, !isMaximizing, isMaximizing ? 1 : -1);

    if (isMaximizing && score > bestScore) {
      bestScore = score;
      bestMove = move;
    } else if (!isMaximizing && score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

const minimax = (squares, isMaximizing, depth) => {
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  if (winner === "X") return 10 - depth;
  if (winner === "O") return depth - 10;
  if (isDraw) return 0;

  const availableMoves = squares
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = "X";
      const score = minimax(newSquares, false, depth + 1);
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = "O";
      const score = minimax(newSquares, true, depth + 1);
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
