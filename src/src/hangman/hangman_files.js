/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for keeping track of the image
 * paths in an instance of a hangman game, dynamically
 * passing the next image according to the user's attempt,
 * if necessary.
 *
 * */

/**
 *
 * Image paths for hangman game.
 * */
const imagePaths = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg", "/images/img4.jpg", "/images/img5.jpg",
        "/images/img6.jpg", "/images/img7.jpg", "/images/img8.jpg", "/images/img9.jpg", "/images/img10.jpg"]

/**
 *
 * Selects the next image from the list.
 * Used when the missed guess occurs in the game.
 *
 * @param {number} index - Index of the next element from the list.
 * @returns {string} - Next image path from the list.
 *
 * */
function nextPart(index) {
  return imagePaths[index];
}

/**
 *
 * Resets the game by setting the first
 * image from the list.
 *
 * @returns {string} - First image path from the list.
 *
 * */
function reset() {
  return nextPart(0);
}

/**
 *
 * File exports.
 * */
export {nextPart, reset};


