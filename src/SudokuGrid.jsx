import React from 'react';
  import './SudokuGrid.css';

  function SudokuGrid({ originalGrid, grid, onGridChange }) {
    const handleInputChange = (row, col, value) => {
      const newGrid = grid.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? value : c)) : r
      );
      onGridChange(newGrid);
    };

    return (
      <table className="sudoku-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className={`${(rowIndex + 1) % 3 === 0 ? 'bottom-border' : ''} ${(colIndex + 1) % 3 === 0 ? 'right-border' : ''}`}>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={cell === 0 ? '' : cell}
                    readOnly={originalGrid[rowIndex][colIndex] !== 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10) || 0;
                      if (value >= 0 && value <= 9) {
                        handleInputChange(rowIndex, colIndex, value);
                      }
                    }}
                    className={originalGrid[rowIndex][colIndex] !== 0 ? 'original-cell' : ''}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default SudokuGrid;
