/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating a complete
 * instance of a hangman game application.
 *
 * */

/**
 *
 * File imports.
 */

import {nextPart, reset} from './hangman_files.js';
import {secretWord} from './words.js';
import {configWindow} from '../window_config'
import {createGameUi} from './hangman-game_ui'

/**
 *
 * Counter for all hangman-game window instances.
 * */
var idCounter = 0;

/**
 *
 * Creates a complete instance of the hangman game
 * application with the specified width and height.
 *
 * @param {number} width - Defines width of the window.
 * @param {number} height - Defines height of the window.
 *
 * @returns {HTMLDivElement} - Window element that is to be created
 *                             on top of the windows stack and be in focus.
 *
 * */
export function createHangmanGameWindow(width, height) {

    const appDiv = document.createElement('div');
    configWindow(appDiv, width, height, idCounter, 'hangman_game', 'Hangman Game');

    /**
     *
     * Game logic related variables.
     * */
    var guessedPositions;
    var guessedLetters;
    var word;
    var imagePath;
    var tryCount;
    var guessCount;

    /**
     *
     * User interface related variables.
     * */
    var currentImg;
    var outcomeText;
    var wordText;
    var guessButton;
    var resetButton;
    var guessTextfield;

    run();

    /**
     *
     * Runs the instance of the hangman game.
     *
     * @returns {void}
     *
     * */
    function run() {

        word = secretWord();
        imagePath = reset();

        var gameDiv = init();
        appDiv.appendChild(gameDiv);

        /**
         *
         * Initializes both the ui and the game logic
         * for the instance of the hangman game.
         *
         * @returns {HTMLDivElement} - DOM div object in which the game runs.
         *
         * */
        function init () {

            let gameDiv = initUi();
            initProperties();
            return gameDiv;

            /**
             *
             * Sets game related variables to initial values.
             *
             * @returns {void}
             *
             * */
            function initProperties () {

                guessedPositions = [];
                guessedLetters = {};
                tryCount = 0;
                guessCount = 0;

                currentImg.setAttribute("src", imagePath);
                outcomeText.innerText = "";
                guessButton.disabled = false;
            }

            /**
             * Initializes the user interface for the
             * instance of the hangman game.
             *
             * @returns {HTMLDivElement} - DOM div object in which the game runs.
             *
             * */
            function initUi () {

                let gameDiv = createGameUi();

                currentImg = gameDiv.children[0].children[0];
                outcomeText = gameDiv.children[2].children[0];
                wordText = gameDiv.children[4].children[0];
                guessButton = gameDiv.children[6].children[0];
                resetButton = gameDiv.children[8].children[0];
                guessTextfield = gameDiv.children[10].children[0];
                initWord(word.length);

                return gameDiv;

                /**
                 *
                 * Initialize the word adjusted for display.
                 *
                 * @param {number} length - Length of the word.
                 * */
                function initWord (length) {

                    let displayWord = "";
                    for (let i = 0; i < length; i++) {
                        displayWord += "_ ";
                    }
                    wordText.innerText = displayWord.replace(/\s/g, ' ');
                }
            }
        }

        enablePlayAndReset();

        /**
         *
         * Sets listeners on buttons for guessing
         * and restarting the game.
         *
         * @returns {void}
         *
         * */
        function enablePlayAndReset () {
            guessButton.addEventListener('click', () => {
                playGuess();
            })
            resetButton.addEventListener('click', () => {
                appDiv.removeChild(gameDiv);
                run();
            })
        }

        /**
         *
         * Handles a single user's attempt
         * to guess a letter.
         *
         * @returns {void}
         *
         * */
        function playGuess () {

            let letter = guessTextfield.value;

            if (letter == null)
                return;

            if (hasLetter(letter)) {
                fillGuessed(letter);
                if (displayOutcome() === 0)
                    disableGuess();
            } else {
                tryCount++;
                if (displayOutcome() === 1) {
                    disableGuess();
                    displayFullWord();
                }
                currentImg.setAttribute("src", nextPart(tryCount));
            }

            /**
             *
             * Attempts to find a letter in the secret word.
             *
             * @param {string} letter - A letter entered by the user.
             * @returns {Boolean} - Whether the attempt is correct or wrong.
             *
             * */
            function hasLetter (letter) {

                let has = false;

                for (let i = 0; i < word.length; i++) {
                    if (word.charAt(i) === letter.toUpperCase()) {
                        if (!guessedPositions.includes(i)) {
                            guessCount++;
                            guessedPositions.push(i);
                        }
                        guessedLetters[i] = letter;
                        has = true;
                    }
                }
                return has;
            }

            /**
             *
             * Displays a current state of the user's view of
             * the word depending on their attempts.
             *
             * @returns {void}
             *
             * */
            function fillGuessed () {

                let displayWord = "";

                for (let i = 0; i < word.length; i++) {
                    if (guessedPositions.includes(i)) {
                        displayWord += guessedLetters[i].toUpperCase() + " ";
                    } else {
                        displayWord += "_ ";
                    }
                }
                wordText.innerText = displayWord.replace(/\s/g, ' ');
            }

            /**
             *
             * Displays the game outcome on the screen.
             *
             * @returns {number} - Current game state.
             *
             * */
            function displayOutcome () {

                let result = outcome();

                if (result === 1) {
                    outcomeText.innerText = "You lose :( Click reset and try again!";
                } else if (result === 0) {
                    outcomeText.innerText = "You win :) Click reset to play again!";
                }
                return result;
            }

            /**
             *
             * Calculates the outcome value.
             *
             * @return {number} - Current game state -
             *                    (-1 for game still not finished).
             *
             * */
            function outcome () {

                if (tryCount >= 9)
                    return 1;
                if (guessCount >= word.length)
                    return 0;
                return -1;
            }

            /**
             *
             * Disables the guess button.
             *
             * @returns {void}
             *
             * */
            function disableGuess () {
                guessButton.disabled = true;
            }

            /**
             *
             * Display (discover) the entire word on the screen.
             *
             * @returns {void}
             *
             * */
            function displayFullWord () {

                let displayWord = "";
                for (let i = 0; i < word.length; i++) {
                    displayWord += word.charAt(i) + " ";
                }
                wordText.innerText = displayWord.replace(/\s/g, ' ');
            }
        }
    }

    return appDiv;
}

