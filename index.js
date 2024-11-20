document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    
    let squares = [];
    let score = 0;

    // Create the game board
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generateTwo();
        generateTwo();
    }
    createBoard();

    // Generate a 2 in a random empty square
    function generateTwo() {
        let random = Math.floor(Math.random() * squares.length);
        if (squares[random].innerHTML == 0) {
            squares[random].innerHTML = 2;
            checkLose();
        } else {
            generateTwo();
        }
    }

    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = parseInt(squares[i].innerHTML);
                let totalTwo = parseInt(squares[i+1].innerHTML);
                let totalThree = parseInt(squares[i+2].innerHTML);
                let totalFour = parseInt(squares[i+3].innerHTML);
                let row = [totalOne, totalTwo, totalThree, totalFour];

                let filteredRow = row.filter(num => num !== 0);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = parseInt(squares[i].innerHTML);
                let totalTwo = parseInt(squares[i+1].innerHTML);
                let totalThree = parseInt(squares[i+2].innerHTML);
                let totalFour = parseInt(squares[i+3].innerHTML);
                let row = [totalOne, totalTwo, totalThree, totalFour];

                let filteredRow = row.filter(num => num !== 0);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // Combine row numbers
    function sumRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combined;
                squares[i+1].innerHTML = 0;
                score += combined;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = parseInt(squares[i].innerHTML);
            let totalTwo = parseInt(squares[i+4].innerHTML);
            let totalThree = parseInt(squares[i+8].innerHTML);
            let totalFour = parseInt(squares[i+12].innerHTML);
            let column = [totalOne, totalTwo, totalThree, totalFour];

            let filteredColumn = column.filter(num => num !== 0);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+4].innerHTML = newColumn[1];
            squares[i+8].innerHTML = newColumn[2];
            squares[i+12].innerHTML = newColumn[3];
        }
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = parseInt(squares[i].innerHTML);
            let totalTwo = parseInt(squares[i+4].innerHTML);
            let totalThree = parseInt(squares[i+8].innerHTML);
            let totalFour = parseInt(squares[i+12].innerHTML);
            let column = [totalOne, totalTwo, totalThree, totalFour];

            let filteredColumn = column.filter(num => num !== 0);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i+4].innerHTML = newColumn[1];
            squares[i+8].innerHTML = newColumn[2];
            squares[i+12].innerHTML = newColumn[3];
        }
    }

    // Combine column numbers
    function sumColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+4].innerHTML) {
                let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML);
                squares[i].innerHTML = combined;
                squares[i+4].innerHTML = 0;
                score += combined;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    // Check for a win
    function checkWin() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 2048) {
                alert('Congratulations! You Win! Refresh to play again.');
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for a loss
    function checkLose() {
        let numZeros = 0;
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0) {
                numZeros++;
            }
        }
        if (numZeros === 0) {
            alert('Game Over! Refresh to play again.');
            document.removeEventListener('keyup', control);
        }
    }

    // Assign controls for arrow keys
    function control(event) {
        if (event.keyCode === 39) {
            keyRight();
        } else if (event.keyCode === 37) {
            keyLeft();
        } else if (event.keyCode === 38) {
            keyUp();
        } else if (event.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        sumRow();
        moveRight();
        generateTwo();
        checkWin();
        checkLose();
    }

    function keyLeft() {
        moveLeft();
        sumRow();
        moveLeft();
        generateTwo();
        checkWin();
        checkLose();
    }

    function keyDown() {
        moveDown();
        sumColumn();
        moveDown();
        generateTwo();
        checkWin();
        checkLose();
    }

    function keyUp() {
        moveUp();
        sumColumn();
        moveUp();
        generateTwo();
        checkWin();
        checkLose();
    }
});
