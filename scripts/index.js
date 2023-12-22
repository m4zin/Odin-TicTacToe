function allWinningCombs(arr) {
  let rowBool = false;
  let colBool = false;
  let firstDiagBool = false;
  let secondDiagBool = false;

  // Checking equality among values in individual rows.
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] == arr[i][j + 1] && arr[i][j + 1] == arr[i][j + 2]) {
        rowBool = true;
      }
    }
  }

  // Checking equality among values in individual columns.
  for (let i = 0; i < arr.length; i++) {
    // - 2 cause we want to stay in ONE column and wait till 'i' iterates to the next column.
    for (let j = 0; j < arr.length - 2; j++) {
      if (arr[j][i] == arr[j + 1][i] && arr[j + 1][i] == arr[j + 2][i]) {
        colBool = true;
      }
    }
  }

  let firstElemOfLeftDiag = arr[0][0];

  // Checking equality in left diagonal of a matrix,
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][i] == firstElemOfLeftDiag) {
      firstDiagBool = true;
    } else {
      firstDiagBool = false;
      // Breaking so it doesn't continue and find for equality which would
      // End up making firstDiag true again.
      break;
    }
  }

  let secElemOfLeftDiag = arr[0][2];
  let colIndex = 2;

  // Checking equality in right diagonal of a matrix,
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][colIndex] == secElemOfLeftDiag) {
      secondDiagBool = true;
    } else {
      secondDiagBool = false;
      break;
    }
    colIndex = colIndex - 1;
  }

  return { rowBool, colBool, firstDiagBool, secondDiagBool };
}

function playGame(arr) {
  whichWinningComb = allWinningCombs(arr);

  while (
    (whichWinningComb.rowBool ||
     whichWinningComb.colBool ||
     whichWinningComb.firstDiagBool ||
     whichWinningComb.secondDiagBool) == true
  ) {
    return true;
  }
}

let arr = [
  [2, 0, 1],
  [4, 2, 6],
  [7, 8, 2],
];

console.log(playGame(arr));
