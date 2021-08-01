/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating a user interface
 * for a single instance of a memory game.
 *
 * */

/**
 *
 * File imports.
 * */
import { setupFooter } from '../window_config'

/**
 *
 * Creates a user interface for an instance of a memory game.
 *
 * @param {HTMLDivElement} div - Window to which the inner game window
 *                                   shall be appended.
 * @param {number} rows - Defines the number of rows for a memory game.
 * @param {number} rows - Defines the number of columns for a memory game.
 * @returns {Array} - Multiple DOM div objects, each representing a single card.
 *
 * */
function createMemoryCardsUi(div, rows, columns) {

  const gridDiv = document.createElement('div');
  gridDiv.classList.add('memory_grid');
  gridDiv.id = 'memory_grid' + div.id;
  div.appendChild(gridDiv);

  const footer = setupFooter(div, 'memory_footer');
  div.appendChild(footer);

  const imagePaths = ['/images/image0.jpg', '/images/image0.jpg',
    '/images/image1.jpg', '/images/image1.jpg', '/images/image2.jpg',
    '/images/image2.jpg', '/images/image3.jpg', '/images/image3.jpg',
    '/images/image4.jpg', '/images/image4.jpg', '/images/image5.jpg',
    '/images/image5.jpg', '/images/image6.jpg', '/images/image6.jpg',
    '/images/image7.jpg', '/images/image7.jpg'];

  shuffleCards(imagePaths);

  /**
   *
   * Shuffles the specified array of cards.
   *
   * @param {Array} cards - Array object to shuffle.
   * @returns {void}
   *
   * */
  function shuffleCards (cards) {
    cards.sort(() => Math.random() - 0.5);
  }

  /**
   *
   * Initialize the cards when the game starts.
   *
   * @param {number} rows - Number of rows present in the memory game.
   * @param {number} columns - Number of columns present in the memory game.
   * @returns {Array} - An array of cards to initialize the game with.
   *
   * */
  function initCards (rows, columns) {

    const flipCards = [];

    for (let i = 0; i < rows * columns; i++) {

      const flipCard = document.createElement('div');
      flipCard.classList.add('flip-card');

      const img = document.createElement('img');
      img.classList.add('img');

      img.src = imagePaths[i];
      img.hidden = true;

      flipCard.appendChild(img);
      gridDiv.appendChild(flipCard);
      flipCards[i] = flipCard;
    }

    return flipCards;
  }

  return initCards(rows, columns);
}

/**
 *
 * File exports.
 * */
export {createMemoryCardsUi};
