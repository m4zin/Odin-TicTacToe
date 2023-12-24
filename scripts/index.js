function getWinningPatterns(boardArr) {
    // each row from board.
    let firstRow = boardArr[0]
    let secRow = boardArr[1]
    let thirdRow = boardArr[2]

    // each column from board.
    let firstCol = boardArr.map(col => col[0]); 
    let secCol = boardArr.map(col => col[1]); 
    let thirdCol = boardArr.map(col => col[2]); 

    // two diagonals from board.
    let firstDiag = []
    let secondDiag = []
    let boardArrLen = 3;

    // Elements of first & second Diagonal.
    for (let i = 0; i < boardArrLen; i++) {
        firstDiag.push(boardArr[i][i]);
        secondDiag.push(boardArr[i][boardArrLen - 1 - i]);
    }

    return {
        firstRow, secRow, thirdRow,
        firstCol, secCol, thirdCol,
        firstDiag, secondDiag
        }
}

function checkFirstWin(arr) {
    let winPatterns = getWinningPatterns(arr)
    
    let xWin = false
    let oWin = false

    // Condition to check if every element in array is equal.
    const allEqual = arr => arr.every(val => val === arr[0]);

    // Array to store boolean of each winning/losing array from winPatterns.
    let results = {};

    // Iterating through each array in winPatterns and checking for win.
    for (const key in winPatterns) {
        if (winPatterns.hasOwnProperty(key)) {
            // Storing boolean of each array from winPatterns object
            results[key] = allEqual(winPatterns[key]) && (winPatterns[key].includes('x') || winPatterns[key].includes('o'));
            // If met with our first true array, then return the winning player.
            if(results[key] == true) {
                if(winPatterns[key].includes('x')) {
                    xWin = true
                    return {xWin, oWin}
                } else {
                    oWin = true
                    return {xWin, oWin}
                }
            }
        }
    }
}

function inputFromPlayer(e, arr) {
    let winningPlayer = checkFirstWin(arr)

    // If either player won, stop the game.
    if(winningPlayer) {
        if(winningPlayer.xWin == true) {
            message.innerHTML = 'X wins!'
            return
        } else if(winningPlayer.oWin == true) {
            message.innerHTML = 'O wins!'
            return
        }
    }

    // If button already clicked before
    if(e.target.innerHTML) {
        return;
    }

    // for DEBUG
    console.log(winningPlayer)
    console.log(e.target.value)

    // Getting values from value attribute to retrieve respective /
    // 2D array indeces.
    const indices = e.target.value.match(/\d+/g);

    const row = parseInt(indices[0], 10);
    const col = parseInt(indices[1], 10);

    // First play is for X
    if(playerTurn.length === 0) {
        e.target.innerHTML = 'X'
        // Placing value in index for checking win as the game goes on.
        arr[row][col] = 'x'
        // Pushing into player turn to switch next player's turn.
        playerTurn.push('x')

        console.log(arr)

        return
    }

    if(playerTurn[0] == 'x') {
        e.target.innerHTML = 'O'
        arr[row][col] = 'o'
        playerTurn.pop()
        playerTurn.push('o')

        console.log(arr)

        return
    }

    if(playerTurn[0] == 'o') {
        e.target.innerHTML = 'X'
        arr[row][col] = 'x'
        playerTurn.pop()
        playerTurn.push('x')

        console.log(arr)

        return
    }

}

function playGame(arr) {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {
            // When button is clicked, run the below func.
            // This func is stored in an anonymous func / 
            // so it wouldn't be called unless clicked.
            inputFromPlayer(e, arr)
        })
    }
}

let boardArr = [
    ['','',''],
    ['','',''],
    ['','','']
]
let playerTurn = []

const buttons = document.querySelectorAll('button')
const message = document.querySelector('.message')

playGame(boardArr)

