var prompt = require('prompt');
let board = [['','',''],['','',''],['','','']];
let player1 = '';
let player2 = '';
let turn = true;

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
const playerMove = (turn) => {
  prompt.get({
    name: turn ? `${player1} move` : `${player2} move`,
    type: 'string',
    required: true
  }, (err, result) => {
    let currentPlayer = turn ? player1 : player2;
    let move = result[`${currentPlayer} move`].split('').map(elem => parseInt(elem) - 1);
    if (!board[move[0]][move[1]] && board[move[0]][move[1]] !== undefined) {
      board[move[0]][move[1]] = turn ? 'X' : 'O';
      turn = !turn;
      displayBoard();
      playerMove(turn);
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