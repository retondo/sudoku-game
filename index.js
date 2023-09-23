/**
 * @param {string[][]} game
 */
function printGame(game) {
  const out = process.stdout;

  for (let i = 0; i < game.length; i++) {
    if (i === 0) {
      out.write('╭─────────────────────────────╮\n');
    }

    for (let j = 0; j < game[i].length; j++) {
      if (j === 0) {
        out.write('│');
      }

      const num = game[i][j];
      const colorCode = num > 6 ? num + 2 : num;
      out.write(` \x1B[38;5;${colorCode}m${num}\x1b[0m `);

      if ([2, 5, 8].includes(j)) {
        out.write('│');
      }
    }

    if ([2, 5].includes(i)) {
      out.write('\n│─────────────────────────────│\n');
    } else if (i === 8) {
      out.write('\n╰─────────────────────────────╯\n');
    } else {
      out.write('\n');
    }
  }
}

/**
 * @param {number} max
 */
function random(max) {
  return Math.floor(Math.random() * max);
}

/**
 * @param {string[][]} matrix
 * @param {number} index
 * @returns {string[]}
 */
function getRow(matrix, index) {
  return matrix[index];
}

/**
 * @param {string[][]} matrix
 * @param {number} index
 * @returns {string[]}
 */
function getColumn(matrix, index) {
  return matrix.map((row) => row[index]);
}

/**
 * @param {string[][]} matrix
 * @param {number} row
 * @param {number} column
 * @returns {string[]}
 */
function getSquare(matrix, row, column) {
  if (row < 3) {
    if (column < 3) {
      return [0, 1, 2].map((i) => matrix[i].slice(0, 3)).flat();
    }
    if (column >= 6) {
      return [0, 1, 2].map((i) => matrix[i].slice(6, 9)).flat();
    }
    return [0, 1, 2].map((i) => matrix[i].slice(3, 6)).flat();
  }

  if (row >= 6) {
    if (column < 3) {
      return [6, 7, 8].map((i) => matrix[i].slice(0, 3)).flat();
    }
    if (column >= 6) {
      return [6, 7, 8].map((i) => matrix[i].slice(6, 9)).flat();
    }
    return [6, 7, 8].map((i) => matrix[i].slice(3, 6)).flat();
  }

  if (column < 3) {
    return [3, 4, 5].map((i) => matrix[i].slice(0, 3)).flat();
  }
  if (column >= 6) {
    return [3, 4, 5].map((i) => matrix[i].slice(6, 9)).flat();
  }
  return [3, 4, 5].map((i) => matrix[i].slice(3, 6)).flat();
}

/**
 * @param {string[][]} [matrix]
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @returns {string[][]}
 */
function generateBoard(
  matrix = Array.from({ length: 9 }, () => Array.from({ length: 9 }).fill()),
  x = 0,
  y = 0,
) {
  const row = getRow(matrix, x);
  const column = getColumn(matrix, y);
  const square = getSquare(matrix, x, y);

  const sample = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].filter(
    (str) => row.concat(column, square).indexOf(str) === -1,
  );

  do {
    const randomSampleIndex = random(sample.length);
    const randomStr = sample[randomSampleIndex];

    if (sample.length > 0) {
      matrix[x][y] = randomStr;

      if (x === 8 && y === 8) {
        return;
      }

      sample.splice(randomSampleIndex, 1);

      const nextX = y === 8 ? x + 1 : x;
      const nextY = y === 8 ? 0 : y + 1;

      generateBoard(matrix, nextX, nextY);
    } else {
      const prevX = y === 0 && x > 0 ? x - 1 : x;
      const prevY = y === 0 ? 8 : y - 1;

      matrix[prevX][prevY] = undefined;

      return;
    }
  } while (matrix[x][y] === undefined);

  return matrix;
}

console.time('execution time');
const sudoku = generateBoard();
console.timeEnd('execution time');
console.log();

printGame(sudoku);
