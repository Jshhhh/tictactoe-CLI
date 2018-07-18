var prompt = require('prompt');
let board = [['','',''],['','',''],['','','']];
let player1 = '';
let player2 = '';

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
}

prompt.start();

prompt.get(['player1', 'player2'], function (err, result) {
  player1 = result.player1;
  player2 = result.player2;
  console.log('Game Initiated');
  console.log(' player1: ' + result.player1);
  console.log(' player2: ' + result.player2);
  displayBoard();
  
  prompt.get({
    name: `${player1} move`,
    type: 'string',
    required: true
  }, (err, result) => {
    console.log(result);
    let move = result[`${player1} move`].split('').map(elem => parseInt(elem));
    if (!board[move[0]][move[1]]) {
      board[move[0]][move[1]] = 'X';
      displayBoard();
    } else {
      console.log('Invalid Move');
    }
  });
});