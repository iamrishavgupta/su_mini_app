'use client';
import { useState, useEffect } from 'react';

const Sudoku = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [originalBoard, setOriginalBoard] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // --- Utility Functions ---
  const isValid = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const generateSolvedBoard = () => {
    const board = Array(9).fill(0).map(() => Array(9).fill(0));

    const fillBoard = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            for (let num of nums) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard()) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    fillBoard();
    return board;
  };

  const removeCells = (board: number[][], difficulty: string) => {
    const newBoard = board.map(row => [...row]);
    let cellsToRemove = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (newBoard[row][col] !== 0) {
        newBoard[row][col] = 0;
        cellsToRemove--;
      }
    }
    return newBoard;
  };

  const generateNewGame = (diff: typeof difficulty) => {
    const solved = generateSolvedBoard();
    const puzzle = removeCells(solved, diff);
    setBoard(puzzle);
    setOriginalBoard(puzzle);
  };

  // --- Start new game on load ---
  useEffect(() => {
    setTimeout(() => generateNewGame(difficulty), 100);
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    if (originalBoard[row][col] !== 0) return;
    const newBoard = board.map(r => [...r]);
    const num = parseInt(value) || 0;
    if (num >= 1 && num <= 9 && isValid(newBoard, row, col, num)) {
      newBoard[row][col] = num;
    } else if (value === '') {
      newBoard[row][col] = 0;
    }
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🧩 Sudoku Mini App</h1>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <select
          className="bg-white text-gray-800 rounded-lg px-3 py-2 text-sm font-medium"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={() => generateNewGame(difficulty)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          🔁 New Game
        </button>
      </div>

      {/* Sudoku Board */}
      <div className="grid grid-cols-9 gap-[1px] bg-black rounded-lg overflow-hidden w-full max-w-[360px] sm:max-w-[420px]">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              maxLength={1}
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(i, j, e.target.value)}
              className={`w-full aspect-square text-center font-bold text-lg sm:text-xl 
                border border-gray-700 bg-gray-100 text-gray-900 focus:outline-none focus:bg-yellow-100
                ${originalBoard[i][j] !== 0 ? 'bg-gray-300 text-gray-700 font-bold' : ''}
              `}
            />
          ))
        )}
      </div>

      <p className="mt-5 text-sm text-gray-200 text-center font-bold">
        Made with ❤️ Rishav
      </p>
    </div>
  );
};

export default Sudoku;
