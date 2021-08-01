/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating a complete
 * instance of a memory game application.
 *
 * */

/**
 *
 * File imports.
 * */
import {configWindow} from '../window_config'
import { createMemoryCardsUi } from './memory-game_ui'

/**
 *
 * Counter for all memory game window instances.
 * */
var idCounter = 0;

/**
 *
 * Creates a complete instance of the memory game
 * application with the specified width and height.
 *
 * @param {number} rows - Defines the number of rows present in a memory game.
 * @param {number} columns - Defines the number of columns present in a memory game.
 * @param {number} width - Defines width of the window.
 * @param {number} height - Defines height of the window.
 * @returns {HTMLDivElement} - Window element that is to be created
 *                             on top of the windows stack and be in focus.
 *
 * */
export function createMemoryGameWindow(rows, columns, width, height) {

  const appDiv = document.createElement('div');
  configWindow(appDiv, width, height, idCounter, 'memory_game', 'Memory Game');

  /**
   *
   * Game logic related variables.
   * */
  var clicks;
  var tries;
  var cards = [];

  init();

  /**
   *
   * Initializes a single instance of a memory game.
   *
   * @returns {void}
   *
   * */
  function init() {

    tries = 0;
    clicks = 0;
    cards = createMemoryCardsUi(appDiv, rows, columns);
    displayTries()
    enableAll();
  }

  /**
   *
   * Displays current number of tries to the
   * window's footer.
   *
   * @returns {void}
   *
   * */
  function displayTries() {
    appDiv.children[2].innerHTML = `Attempt counter : ${tries}`;
  }

  /**
   *
   * Makes all cards currently not guessed to be flippable.
   *
   * @returns {void}
   *
   * */
  function enableAll() {
    cards.forEach(card => {
      enableFlippable(card);
    })
  }

  /**
   *
   * Enables a card to be flippable.
   *
   * @param {HTMLDivElement} card - Chosen flip card.
   * @returns {void}
   *
   * */
  function enableFlippable(card) {
    card.onclick = () => {
      cardOnClick(card);
    }
  }

  /**
   *
   * Variables for each turn, to keep track of matching.
   * */
  var firstCard = null;
  var secondCard = null;

  /**
   *
   * Disables all available cards from being flippable.
   *
   * @returns {void}
   *
   * */
  const disableAll = () => {
    cards.forEach(card => {
      disableFlippable(card);
    })
  }

  /**
   *
   * Disables a specified card from being flippable.
   *
   * @param {HTMLDivElement} card - Chosen flip card.
   * @returns {void}
   *
   * */
  function disableFlippable(card) {
    card.onclick = () => {
      return false;
    }
  }

  /**
   *
   * Sets up logic for when the user presses
   * on a single card.
   *
   * @param {HTMLDivElement} card - Chosen flip card.
   *
   * */
  function cardOnClick(card) {

    if(!cards.includes(card))
      return;

    initCurrentCards();

    /**
     *
     * Initialize first and second card on clicks, respectively.
     *
     * @returns {void}
     *
     * */
    function initCurrentCards () {

      if (firstCard === null) {
        firstCard = card;
      } else if (firstCard != null && secondCard == null) {
        secondCard = card;
      }
    }

    clicks++;
    disableFlippable(card);

    if(clicks === 1) {
      flipFront(card);
    }else {
      handleSecondFlip();
      disableAll();
      setTimeout(() => {
        clicks = 0;
        enableAll();
      }, 2500);
    }

    /**
     *
     * Handles the logic for after every second card
     * is opened and proceeds with gameplay accordingly.
     *
     * @returns {void}
     *
     * */
    function handleSecondFlip() {

      flipFront(card);

      if(secondCard.children[0].src === firstCard.children[0].src) {
        cards = cards.filter( card => { return card.children[0].src !== firstCard.children[0].src;})
        if(isWon()) {
          endGame('Congratulations. You win :)');
          return;
        }
      }else {
        flipBack(secondCard);
        flipBack(firstCard);
      }

        /**
         *
         * Checks whether the game is won.
         *
         * @returns {Boolean}
         *
         * */
        function isWon() {
          console.log(cards.length === 0)
          return cards.length === 0;
        }

      firstCard = null;
      secondCard = null;

      tries++;
      displayTries();

      if(isLost())
        endGame("GAME OVER. YOU LOST :(");

      /**
       *
       * Checks whether the game is lost.
       *
       * @returns {Boolean} - True if number of tries exceeds the limit.
       *
       * */
      function isLost() {
        return tries > 15;
      }

      /**
       *
       * Displays the appropriate message if the
       * game ending condition is reached, disables all
       * the cards and creates a restart button.
       *
       * @param {string} message - Final message to be displayed to the user.
       * @returns {void}
       *
       * */
      function endGame(message) {

        const footer = document.getElementById('memory_footer' + appDiv.id);
        footer.innerHTML = message;
        footer.appendChild(createRestartButton());
        disableAll();

        /**
         *
         * Creates a restart button upon finishing the game.
         *
         * @returns {HTMLButtonElement}
         *
         * */
        function createRestartButton() {
          const btn = document.createElement('button');
          btn.classList.add('custom_btn');
          btn.id = 'restartBtn';
          btn.innerHTML = "Play again?"
          btn.onclick = () => {
            appDiv.removeChild(document.getElementById('memory_grid' + appDiv.id));
            appDiv.removeChild(document.getElementById('memory_footer' + appDiv.id));
            init();
          }
          return btn;
        }
      }
    }

    /**
     *
     * Flips the card to its front side,
     * showing the image.
     *
     * @param {HTMLDivElement} card - The chosen flip card.
     * @returns {void}
     *
     * */
    function flipFront(card) {
      card.style.transform = 'rotateY(180deg)';
      card.style.transition = 'transform 0.8s';
      card.style.transformStyle = 'preserve-3d';

      setTimeout(() => {
        card.children[0].hidden = false;
      }, 250);
    }

    /**
     *
     * Flips the card to its back side,
     * hiding the image.
     *
     * @param {HTMLDivElement} card - The chosen flip card.
     * @returns {void}
     *
     * */
    function flipBack(card) {
      setTimeout(() => {
        card.style.transform = 'rotateY(0deg)';
        card.style.transition = 'transform 0.8s';
        card.style.transformStyle = 'preserve-3d';
        setTimeout(() => {
          card.children[0].hidden = true;

        }, 250);
      }, 2250);
    }
  }

  return appDiv;
}

