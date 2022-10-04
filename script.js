const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const gameOverScreen = document.querySelector('.game-over')
const gameOverMessage = document.querySelector('.message');
const resetBtn = document.querySelector('#reset');
const winningBoards = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let xTurn = true;
const x = 'x';
const circle = 'o';

function startGame(){
    cells.forEach(cell => {
        cell.classList.remove(x);
        cell.classList.remove(circle);
        cell.removeEventListener('click', updateCell);
        cell.addEventListener('click', updateCell, {once: true});
    });
    updateBoardClass();
    gameOverScreen.classList.remove('show');
}

function updateCell(e){
    const cell = e.target;
    const currentMove = xTurn ? x: circle;
    markCell(cell, currentMove);
    if (checkWin(currentMove)){
        endGame(false);
    }
    else if (checkTie()){
        endGame(true);
    }
    else{
        console.log('nextTurn')
        nextTurn();
        updateBoardClass();
    }
}

function markCell(cell, currentMove){
    cell.classList.add(currentMove);
}

function nextTurn(){
    xTurn = !xTurn;
}

function updateBoardClass(){
    board.classList.remove(x);
    board.classList.remove(circle);
    if (xTurn){
        board.classList.add(x);
    }
    else {
        board.classList.add(circle);
    }
}

function checkWin(currentMove){
    return winningBoards.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentMove);
        });
    });
}

function checkTie(){
    return [...cells].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(circle);
    });
}

function endGame(draw){
    if (draw){
        gameOverMessage.textContent = 'Tie';
    }
    else {
        gameOverMessage.textContent = `${xTurn? 'X': 'O'} Wins!`;
    }
    gameOverScreen.classList.add('show');
}

startGame();
resetBtn.addEventListener('click', startGame);