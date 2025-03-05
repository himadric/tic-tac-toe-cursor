export const calculateWinner = (squares) => {
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

export const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

export const getInitialState = () => ({
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  isDraw: false,
  score: { X: 0, O: 0 },
  gameHistory: [],
});

export const handleMove = (squares, index, xIsNext) => {
  if (squares[index] || calculateWinner(squares)) {
    return squares;
  }

  const newSquares = [...squares];
  newSquares[index] = xIsNext ? 'X' : 'O';
  return newSquares;
}; 