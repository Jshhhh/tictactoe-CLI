var prompt = require('prompt');
let board = [['','',''],['','',''],['','','']];
let player1 = '';
let player2 = '';
let turn = true;

const checkRows = () => {
  for (let i = 0; i < 3; i++) {
    let current = board[i][0];
    let win = true;
    for (let j = 1; j < 3; j++) {
      if (board[i][j] !== current) {
        win = false;
      }
    }
    return win || false;
  }
};

const checkColumns = () => {
  for (let i = 0; i < 3; i++) {
    let current = board[0][i];
    let win = true;
    for (let j = 1; j < 3; j++) {
      if (board[j][i] !== current) {
        win = false;
      }
    }
    return win || false;
  }
};

const checkDiag = () => {
  let middle = board[1][1];
  if (board[0][0] === middle && middle === board[2][2]) {
    return true;
  } else if (board[0][2] === middle && middle === board[2][0]) {
    return true
  }
  return false;
};

const checkWin = () => {
  console.log(checkColumns(), checkRows(), checkDiag());
  return checkColumns() || checkRows() || checkDiag();
};

const displayBoard = () => {
  let string = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      string += `   ${board[i][j]}   `
      if (j !== 2) {
        string += '|'
      }
    }
    if (i !== 2) {
      string += `\n---------------------\n`
    }
  }
  console.log(string);
};

//starts prompt
prompt.start();

//starts move for current player
const playerMove = () => {
  prompt.get({
    name: turn ? `${player1} move` : `${player2} move`,
    type: 'string',
    required: true
  }, (err, result) => {
    let currentPlayer = turn ? player1 : player2;
    let move = result[`${currentPlayer} move`].split('').map(elem => parseInt(elem) - 1);
    if (!board[move[0]][move[1]] && board[move[0]][move[1]] !== undefined) {
      board[move[0]][move[1]] = turn ? 'X' : 'O';
      displayBoard();
      //if win then stop game
      if (checkWin()) {
        console.log(currentPlayer, 'wins');
      } else {
        turn = !turn;
        displayBoard();
        playerMove(turn);
      }
    } else {
      console.log('Invalid Move');
      playerMove();
    }
  });
};

//Initialize player names
prompt.get(['player1', 'player2'], function (err, result) {
  player1 = result.player1;
  player2 = result.player2;
  console.log('Game Initiated');
  console.log(' player1: ' + result.player1);
  console.log(' player2: ' + result.player2);
  displayBoard();
  playerMove(turn);
});