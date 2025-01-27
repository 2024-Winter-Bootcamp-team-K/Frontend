import React, { useState, useEffect, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const generateSudokuBoard = (difficulty = 'medium') => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  const shuffleNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {

          const numbers = shuffleNumbers();
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) {
                return true;
              }
              board[row][col] = 0;
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
      if (board[row][x] === num) return false;
    }

    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    
    return true;
  };

  const initializeBoard = () => {
    const numbers = shuffleNumbers();
    for (let i = 0; i < 3; i++) {
      board[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = numbers[i];
    }
  };

  initializeBoard();
  solve(board);

  const removeNumbers = (board: number[][], difficulty: string) => {
    const boardCopy = board.map(row => [...row]);
    const counts = { 'easy': 30, 'medium': 45, 'hard': 55 };
    const cellsToRemove = counts[difficulty as keyof typeof counts] || 45;

    const positions = [];
    for (let i = 0; i < 81; i++) {
      positions.push(i);
    }
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    for (let i = 0; i < cellsToRemove; i++) {
      const pos = positions[i];
      const row = Math.floor(pos / 9);
      const col = pos % 9;
      boardCopy[row][col] = 0;
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
      className="w-[33vw] mx-auto px-[2vw] py-[1vw] bg-gray-300 backdrop-blur-sm shadow-lg rounded-lg"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div 
        className="absolute inset-[0.5vw] border-2 border-dashed border-gray-500 rounded-lg pointer-events-none"
      ></div>
      <div className="text-center mb-2">
        <h1 className="text-[3vw] font-bold text-gray-900 font-Binggrae tracking-[0.2vw]">스도쿠</h1>
        <p className="text-gray-800 text-[1.1vw]">잘못된 시도: {mistakes}회</p>
      </div>

      <div className="grid grid-cols-9 gap-[0.2vw] mx-auto" style={{
        width: 'calc(9 * 3.2vw)', 
        height: 'calc(9 * 3.3vw)'  
      }}>
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
                  border-2 border-gray-400 flex items-center justify-center
                  cursor-pointer transition-all duration-200 relative
                  ${isSelected ? 'z-10 shadow-lg' : ''}
                  ${isOriginalPuzzleCell ? 'font-bold text-gray-900' : 'text-gray-900'}
                  ${isIncorrect ? 'text-red-700 bg-red-100 font-bold' : ''}
                  ${isHintCell ? 'bg-yellow-200 animate-pulse' : ''}
                  ${(rowIndex + 1) % 3 === 0 ? 'mb-[0.4vw] border-b-4 border-black' : ''}
                  ${(colIndex + 1) % 3 === 0 ? 'mr-[0.4vw] border-r-4 border-black' : ''}
                `}
                style={{
                  width: '3vw',
                  height: '3vw',
                  fontSize: '1.5vw',
                  fontWeight: isOriginalPuzzleCell ? 'bold' : 'normal'
                }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-white/70 -z-10 rounded"></div>
                )}
                {cell !== 0 ? cell : '+'}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-2 mb-1 flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center justify-center"
          style={{
            width: "10vw", 
            height: "3vw", 
            fontSize: "1.2vw"
          }}
        >
          새 게임
        </button>

        <button
          onClick={undoMove}
          className="bg-blue-800 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          style={{
            width: "3vw", 
            height: "3vw",
            fontSize: "1vw"
          }}
          disabled={previousMoves.length === 0}
        >
          <FontAwesomeIcon icon={faUndo} size="lg" />
        </button>

        <button
          onClick={giveHint}
          className="bg-green-800 text-white rounded hover:bg-green-700 flex items-center justify-center"
          style={{
            width: "3vw", 
            height: "3vw",
            fontSize: "1vw"
          }}
        >
          <FontAwesomeIcon icon={faLightbulb} size="lg" />
        </button>
      </div>

      {isGameComplete() && (
        <div className="text-center text-gray-900 mt-4 text-[2vw] font-bold font-Binggrae">
          Game Complete!
        </div>
      )}
    </div>
  );
};

export default SudokuGame;