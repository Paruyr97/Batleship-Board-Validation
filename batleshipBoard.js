class BatleshipBoard {
    
    constructor(board) {
        this.board = board;
    }

    rotateBoard = () => {

        let currentLine = '';
        const resultArray = [];

        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board.length; j++) {
                currentLine += this.board[j][i];
            }
            resultArray.push(currentLine);
            currentLine = '';
        }

        return resultArray;
    }

    count = (array, value) => {
        return array.filter( item => item == value).length;
    }

    isValidBoard = ()  => {

        const rotatedBoard = this.rotateBoard();
        
        const ships = [...this.board.join('').split('0'),
                       ...rotatedBoard.join('').split('0')].filter( item => item.includes('1'));

        return this.count(ships, '1') === 24 
            && this.count(ships, '11') === 3 
            && this.count(ships, '111') === 2 
            && this.count(ships, '1111') === 1 
            && this.checkDiaganal();
    }

    checkDiaganal = () => {

        const reversedLinesBoard = this.board.map( item => item.split('').reverse().join(''));

        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if ((this.board[i - 1][j] === '1' && this.board[i][j + 1] === '1'
                        || reversedLinesBoard[i - 1][j] === '1' && reversedLinesBoard[i][j + 1] === '1')) {
                    return false;
                }
            }
        }

        return true;
    }
}

const board = new BatleshipBoard([
    '0000000000',
    '1100001000',
    '0000000011',
    '0100100000',
    '0000000000',
    '0000100011',
    '0000000000',
    '0001111000',
    '0000000000',
    '1110000111'
]);

console.log(board.isValidBoard());
