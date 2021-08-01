/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating a user interface
 * for an instance of a hangman game.
 *
 * */

/**
 *
 * Creates a user interface for hangman game.
 *
 * @returns {HTMLDivElement} - DOM div object in which the game runs.
 *
 * */
function createGameUi() {

  const outerDiv = document.createElement('div');
  outerDiv.classList.add('chat_div');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('image_div');
  const currentImg = document.createElement('img');
  imgDiv.appendChild(currentImg); // 0, 0 - current image
  outerDiv.appendChild(imgDiv);

  outerDiv.appendChild(document.createElement('hr'));

  const outputDiv = document.createElement('div');
  outputDiv.classList.add('game-row_div');

  const outcomeText = document.createElement('output');
  outcomeText.style.fontSize = '15px';

  outputDiv.appendChild(outcomeText); //2, 0
  outerDiv.appendChild(outputDiv);
  outerDiv.appendChild(document.createElement('hr'));

  const wordTextDiv = document.createElement('div');
  wordTextDiv.classList.add('game-row_div');

  const wordText = document.createElement('output');
  outcomeText.style.fontSize = '18px';

  wordTextDiv.appendChild(wordText);
  outerDiv.appendChild(wordTextDiv); //4, 0
  outerDiv.appendChild(document.createElement('hr'))

  const guessBtnDiv = document.createElement('div');
  guessBtnDiv.classList.add('game-row_div');

  const guessButton = document.createElement('input');
  guessButton.type = 'button';
  guessButton.id = 'guess_btn' + guessBtnDiv.id;
  guessButton.classList.add('game_guess_btn');
  guessButton.value = 'Guess';

  guessBtnDiv.appendChild(guessButton); //6, 0
  outerDiv.appendChild(guessBtnDiv);
  outerDiv.appendChild(document.createElement('hr'));

  const resetBtnDiv = document.createElement('div');
  resetBtnDiv.classList.add('game-row_div');

  const resetButton = document.createElement('input');
  resetButton.type = 'button';
  resetButton.classList.add('game_reset_btn');
  resetButton.value = 'Reset';

  resetBtnDiv.appendChild(resetButton); //8, 0
  outerDiv.appendChild(resetBtnDiv);
  outerDiv.appendChild(document.createElement('hr'));

  const guessInputDiv = document.createElement('div');
  guessInputDiv.classList.add('game-row_div');

  const guess = document.createElement('input');
  guess.classList.add('guess_textfield');
  guess.type = 'text';
  guess.maxLength = 1;
  guess.placeholder = ' Guess here';

  guessInputDiv.appendChild(guess); //10, 0
  outerDiv.appendChild(guessInputDiv);

  return outerDiv;
}

/**
 *
 * File exports.
 * */
export { createGameUi };
