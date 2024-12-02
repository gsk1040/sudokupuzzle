import React, { useState, useEffect } from 'react';
  import SudokuGrid from './SudokuGrid';
  import { generateSudoku, solveSudoku } from './sudokuLogic';

  function App() {
    const [originalGrid, setOriginalGrid] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [grid, setGrid] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [solvedGrid, setSolvedGrid] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [difficulty, setDifficulty] = useState('medium');

    useEffect(() => {
      generateNewPuzzle();
    }, [difficulty]);

    const generateNewPuzzle = () => {
      const newGrid = generateSudoku();
      const solved = solveSudoku(JSON.parse(JSON.stringify(newGrid)));
      setSolvedGrid(solved);
      setOriginalGrid(JSON.parse(JSON.stringify(newGrid)));
      const puzzle = createPuzzle(newGrid, difficulty);
      setGrid(puzzle);
    };

    const createPuzzle = (grid, difficulty) => {
      let attempts = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;
      let puzzle = JSON.parse(JSON.stringify(grid));
      while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
          puzzle[row][col] = 0;
          attempts--;
        }
      }
      return puzzle;
    };

    const handleGridChange = (newGrid) => {
      setGrid(newGrid);
      if (JSON.stringify(newGrid) === JSON.stringify(solvedGrid)) {
        setTimeout(() => {
          alert('Congratulations! You solved the puzzle!');
        }, 100);
      }
    };


    const handleDifficultyChange = (event) => {
      setDifficulty(event.target.value);
    };

    return (
      <div>
        <h1>Sudoku</h1>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={generateNewPuzzle}>New Puzzle</button>
        <SudokuGrid
          originalGrid={originalGrid}
          grid={grid}
          onGridChange={handleGridChange}
        />
      </div>
    );
  }

  export default App;
