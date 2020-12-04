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
  let recurse = function(board, rowNum) {
    let total = 0;
    if (rowNum > board.get('n') - 1) {
      return 1;
    }
    for (var i = 0; i < board.get(rowNum).length; i++) {
      if (!board.hasPotentialColConflictAt(i) && board.get(rowNum)[i] !== 1) {
        board.togglePiece(rowNum, i);
        let newRow = rowNum + 1;
        total += recurse(board, newRow);
        board.togglePiece(rowNum, i);
      }
    }
    return total;
  };
  return recurse(board, 0);

};
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

//   };
//   recurse(board, [_.range(n), _.range(n)], 0);
//   return Object.keys(solutions).length;
// };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  let board = new Board({n: n});
  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }

  let recurse = function(board, rowNum) {

    if (rowNum === board.get('n') - 1) {
      for (let col = 0; col < board.get('n'); col++) {
        board.togglePiece(rowNum, col);
        if (board.hasAnyQueenConflictsOn(rowNum, col)) {
          board.togglePiece(rowNum, col);
        } else {
          return board.rows();
        }
      }
      return null;
    }
    for (let col = 0; col < board.get('n'); col++) {
      board.togglePiece(rowNum, col);
      if (board.hasAnyQueenConflictsOn(rowNum, col)) {
        board.togglePiece(rowNum, col);
      } else {
        let newRow = rowNum + 1;
        let branch = recurse(board, newRow);
        if (branch) {
          return branch;
        } else {
          board.togglePiece(rowNum, col);
        }
      }
    }
    return null;
  };
  let solution = recurse(board, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
// let recurse = function(board, [rows, cols], pieceCount) {
//   // debugger;
//   if (pieceCount === n) {
//     solutions.push(board.rows());
//   }
//   // if no solution found return null;
//   for (let row of rows) {
//     for (let col of cols) {
//       // toggle
//       board.togglePiece(row, col);
//       // if conflicts at toggle location
//       if (  board.hasAnyQueenConflictsOn(row, col)) {
//         // untoggle
//         board.togglePiece(row, col);
//       } else {
//         pieceCount++;
//         let newRows = rows.filter(y => y !== row);
//         let newCols = cols.filter(x => x !== col);
//         recurse(board, [newRows, newCols], pieceCount);
//         if (solutions.length === 1) {
//           return solutions[0];
//         }
//         board.togglePiece(row, col);
//         pieceCount--;
//       }
//     }
//   }
// };
//   var solution = recurse(board, [_.range(n), _.range(n)], 0);
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let board = new Board({n: n});
  if (n === 0) {
    return 1;
  }

  let recurse = function(board, rowNum) {
    if (n === 4){
    }
    if (rowNum === board.get('n') - 1) {
      for (let col = 0; col < board.get('n'); col++) {
        board.togglePiece(rowNum, col);
        if (board.hasAnyQueenConflictsOn(rowNum, col)) {
          board.togglePiece(rowNum, col);
        } else {
          board.togglePiece(rowNum, col);
          return 1;
        }
      }
      return 0;
    }
    let total = 0;
    for (let col = 0; col < board.get('n'); col++) {
      board.togglePiece(rowNum, col);
      if (board.hasAnyQueenConflictsOn(rowNum, col)) {
        board.togglePiece(rowNum, col);
      } else {
        let newRow = rowNum + 1;
        total += recurse(board, newRow);
        board.togglePiece(rowNum, col);
      }
    }
    return total;
  };
  var solutionCount = recurse(board, 0); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
