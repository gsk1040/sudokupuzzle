export function generateSudoku() {
    let grid = Array(9).fill(null).map(() => Array(9).fill(0));
    fillSudoku(grid);
    return grid;
  }

  function fillSudoku(grid) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          shuffleArray(nums); // Shuffle the numbers for better randomization
          for (let num of nums) {
            if (isSafe(grid, i, j, num)) {
              grid[i][j] = num;
              if (fillSudoku(grid)) {
                return true;
              } else {
                grid[i][j] = 0; // Backtrack if the number doesn't lead to a solution
              }
            }
          }
          return false; // No valid number found for this cell
        }
      }
    }
    return true; // Puzzle is filled
  }


  function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) if (grid[row][x] === num) return false;
    for (let x = 0; x < 9; x++) if (grid[x][col] === num) return false;
    let startRow = row - row % 3,
      startCol = col - col % 3;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] === num) return false;

    return true;
  }

  export function solveSudoku(grid) {
    let solved = JSON.parse(JSON.stringify(grid)); // Create a copy to avoid modifying the original
    if (solveGrid(solved)) return solved;
    return null;
  }

  function solveGrid(grid) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(grid, i, j, num)) {
              grid[i][j] = num;
              if (solveGrid(grid)) return true;
              grid[i][j] = 0; // Backtrack
            }
          }
          return false; // No solution
        }
      }
    }
    return true; // Puzzle solved
  }


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
