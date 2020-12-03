/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let board = new Board({n: n});
  let pieceCount = 0;
  let cols = {};
  for (let row = 0; row < n; row++) {
    if (pieceCount === n) {
      break;
    }
    for (let col = 0; col < n; col++) {
      if (cols[col]) {
        continue;
      }
      if (pieceCount === n) {
        break;
      }
      board.togglePiece(row, col);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
        // nothing placed
        board.togglePiece(row, col);
      } else {
        // if placed, skip to next row and next column
        pieceCount++;
        cols[col] = 1;
        break;
      }
    }
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// let solutionOne = new Board(findNRooksSolution(n));
// let positions = [];
// for(let i = 0; i < solution.get('n'); i++) {
//   let row = solution.get('n')[i];
//   for (let j = 0; j < solution.get('n'); j++) {
//     if (solution.get(i)[j] === 1) {
//       positions.push([i, j]);
//     }
//   }
// }
// for (let k = 0; k < positions.length; k++) {
//   let currentPiece = position[k]
// }


window.countNRooksSolutions = function(n) {
  let solutions = {};
  let board = new Board({n: n});
  let recurse = function(board, row) {
    // if (pieceCount === n) {
    //   solutions[JSON.stringify(board.rows())] = 1;
    //   return;
    // }
    // for (let row of rows) {
    //   for (let col of cols) {
    //     if (!board.hasPotentialRowConflictAt(row) && !board.hasPotentialColConflictAt(col)) {
    //       board.togglePiece(row, col);
    //       pieceCount++;
    //       let newRows = rows.filter(y => y !== row);
    //       let newCols = cols.filter(x => x !== col);
    //       recurse(board, [newRows, newCols], pieceCount);
    //       board.togglePiece(row, col);
    //       pieceCount--;
    //     }


    //   }
    // }
    // for (let square of row) {

    // }
  };
  recurse(board, [_.range(n), _.range(n)], 0);
  return Object.keys(solutions).length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
