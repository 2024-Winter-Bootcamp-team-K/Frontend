import React, { useState, useEffect, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const generateSudokuBoard = (difficulty = 'medium') => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              const newBoard = board.map(r => [...r]);
              newBoard[row][col] = num;
              
              if (solve(newBoard)) {
                for (let i = 0; i < 9; i++) {
                  for (let j = 0; j < 9; j++) {
                    board[i][j] = newBoard[i][j];
                  }
                }
                return true;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    
    return true;
  };

  solve(board);

  const removeNumbers = (board: number[][], difficulty: string) => {
    const boardCopy = board.map(row => [...row]);
    const counts = { 'easy': 30, 'medium': 45, 'hard': 55 };
    const cellsToRemove = counts[difficulty as keyof typeof counts] || 45;

    let removedCount = 0;
    while (removedCount < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (boardCopy[row][col] !== 0) {
        boardCopy[row][col] = 0;
        removedCount++;
      }
    }

    return boardCopy;
  };

  const solution = board.map(row => [...row]);
  const puzzle = removeNumbers(solution, difficulty);

  return { solution, puzzle };
};

const SudokuGame: React.FC = () => {
  const [game, setGame] = useState(() => generateSudokuBoard());
  const [boardState, setBoardState] = useState<number[][]>([]);
  const [incorrectCells, setIncorrectCells] = useState<{[key: string]: boolean}>({});
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [hintCell, setHintCell] = useState<{row: number, col: number} | null>(null);
  const [previousMoves, setPreviousMoves] = useState<{boardState: number[][], selectedCell: {row: number, col: number} | null}[]>([]);

  useEffect(() => {
    setBoardState(game.puzzle.map(row => [...row]));
    setIncorrectCells({});
    setHintCell(null);
    setPreviousMoves([]);
  }, [game]);

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!selectedCell) return;

    const key = e.key;
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key);
      const newBoardState = boardState.map(row => [...row]);
      const cellKey = `${selectedCell.row}-${selectedCell.col}`;
      
      setPreviousMoves(prev => [...prev, { 
        boardState: boardState.map(row => [...row]), 
        selectedCell: selectedCell 
      }]);

      newBoardState[selectedCell.row][selectedCell.col] = num;
      
      if (game.puzzle[selectedCell.row][selectedCell.col] === 0) {
        if (num !== game.solution[selectedCell.row][selectedCell.col]) {
          setMistakes(prev => prev + 1);
          setIncorrectCells(prev => ({
            ...prev,
            [cellKey]: true
          }));
        } else {
          const newIncorrectCells = {...incorrectCells};
          delete newIncorrectCells[cellKey];
          setIncorrectCells(newIncorrectCells);
        }
      }
      
      setBoardState(newBoardState);
      setSelectedCell(null);
    }
  };

  const handleCellSelect = (row: number, col: number) => {
    if (game.puzzle[row][col] === 0 || incorrectCells[`${row}-${col}`]) {
      setSelectedCell({ row, col });
    }
  };

  const resetGame = () => {
    setGame(generateSudokuBoard());
    setMistakes(0);
    setSelectedCell(null);
  };

  const undoMove = () => {
    if (previousMoves.length > 0) {
      const lastMove = previousMoves[previousMoves.length - 1];
      setBoardState(lastMove.boardState);
      setSelectedCell(lastMove.selectedCell);
      setPreviousMoves(prev => prev.slice(0, -1));
    }
  };

  const giveHint = () => {
    const emptyCells: {row: number, col: number}[] = [];
    boardState.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      const newBoardState = boardState.map(row => [...row]);
      newBoardState[randomEmptyCell.row][randomEmptyCell.col] = game.solution[randomEmptyCell.row][randomEmptyCell.col];
      
      setBoardState(newBoardState);
      setHintCell(randomEmptyCell);
      
      setTimeout(() => setHintCell(null), 2000);
    }
  };

  const isGameComplete = () => {
    return boardState.every((row, rowIndex) => 
      row.every((cell, colIndex) => cell === game.solution[rowIndex][colIndex])
    );
  };

  return (
    <div 
      className="w-full max-w-md mx-auto p-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">스도쿠</h1>
        <p className="text-gray-800">잘못된 시도: {mistakes}회</p>
      </div>

      <div className="grid grid-cols-9 gap-1">
        {boardState.map((row, rowIndex) => 
          row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;
            const isIncorrect = incorrectCells[cellKey];
            const isOriginalPuzzleCell = game.puzzle[rowIndex][colIndex] !== 0;
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isHintCell = hintCell?.row === rowIndex && hintCell?.col === colIndex;
            
            return (
              <div 
                key={cellKey}
                onClick={() => handleCellSelect(rowIndex, colIndex)}
                className={`
                  border-2 border-gray-400 flex items-center justify-center text-xl font-bold
                  h-10 w-10 cursor-pointer transition-all duration-200
                  ${isSelected ? 'transform -translate-y-2 scale-110 z-10 shadow-lg' : ''}
                  ${isOriginalPuzzleCell ? 'font-bold text-gray-900' : 'text-gray-900'}
                  ${isIncorrect ? 'text-red-700 bg-red-100 font-bold' : ''}
                  ${isHintCell ? 'bg-yellow-200 animate-pulse' : ''}
                  ${(rowIndex + 1) % 3 === 0 ? 'mb-2 border-b-4 border-black' : ''}
                  ${(colIndex + 1) % 3 === 0 ? 'mr-2 border-r-4 border-black' : ''}
                `}
              >
                {cell !== 0 ? cell : '+'}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button 
          onClick={resetGame}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          새 게임
        </button>
        <button 
          onClick={undoMove}
          className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={previousMoves.length === 0}
        >
          <FontAwesomeIcon icon={faUndo} size="lg" />
        </button>
        <button 
          onClick={giveHint}
          className="bg-green-800 text-white p-2 rounded hover:bg-green-700"
        >
          <FontAwesomeIcon icon={faLightbulb} size="lg" />
        </button>
      </div>

      {isGameComplete() && (
        <div className="text-center text-green-600 mt-4 text-2xl font-bold">
          Game Complete!
        </div>
      )}
    </div>
  );
};

export default SudokuGame;