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
                } else {
                    oWin = true
                }
                return {xWin, oWin}
            } 
        }
    }
}

function inputFromPlayer(e, arr) {
    // If button already clicked before
    if(e.target.innerHTML) {
        return;
    }

    // If object is not empty.
    for (const key in winningPlayer) {
        if(winningPlayer.hasOwnProperty(key)) {
            return
        }
    }

    // Getting values from value attribute to retrieve respective /
    // 2D array indeces.
    const indices = e.target.value.match(/\d+/g);

    const row = parseInt(indices[0], 10);
    const col = parseInt(indices[1], 10);

    // First play is for X
    if(playerTurn.length === 0) {
        e.target.innerHTML = 'X'
        e.target.style.color = 'red'
        // Placing value in index for checking win as the game goes on.
        arr[row][col] = 'x'
        // Pushing into player turn to switch next player's turn.
        playerTurn.push('x')
    } else if(playerTurn[0] == 'x') {
        e.target.innerHTML = 'O'
        e.target.style.color = 'blue'
        arr[row][col] = 'o'
        playerTurn.pop()
        playerTurn.push('o')
    } else if(playerTurn[0] == 'o') {
        e.target.innerHTML = 'X'
        e.target.style.color = 'red'
        arr[row][col] = 'x'
        playerTurn.pop()
        playerTurn.push('x')
    }

    // Checking for winning pattern.
    winningPlayer = checkFirstWin(arr)

    // If either player won, stop the game.
    if(winningPlayer) {
        if(winningPlayer.xWin == true) {
            message.innerHTML = 'X wins!'
        } else if(winningPlayer.oWin == true) {
            message.innerHTML = 'O wins!'
        }
        storeWinningPlayer = winningPlayer
        addReloadBtn()
        return
    }

}

function playGame(arr) {

    // To track for game ties.
    let clickedCount = 0;

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {
            clickedCount++
            // When button is clicked, run the below func.
            // This func is stored in an anonymous func / 
            // so it wouldn't be called unless clicked.
            inputFromPlayer(e, arr)
            // If it's a tie.
            if(clickedCount == 9 && (!winningPlayer)) {
                message.innerHTML = 'Its a tie!'
                addReloadBtn()
                return
            }
        })
    }
}

function addReloadBtn() {
    let restartBtn = document.createElement('button')
    restartBtn.className = 'restart-button'
    restartBtn.innerHTML = 'restart'
    restartDiv.append(restartBtn)

    restartBtn.addEventListener('click', () => {
        location.reload()
    })
}

let boardArr = [
    ['','',''],
    ['','',''],
    ['','','']
]

const buttons = document.querySelectorAll('.play-button')
const message = document.querySelector('.message')
const restartDiv = document.querySelector('.restart')

let playerTurn = []
let winningPlayer = {}
let storeWinningPlayer = {};

playGame(boardArr)

