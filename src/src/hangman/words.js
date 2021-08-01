/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for tracking words in an instance
 * of a hangman game and generating one randomly.
 *
 * */

/**
 *
 * Words present in the game.
 * */
const words = ["ABSURD", "BAGPIPES", "CRYPTOGRAPHY", "DWARFISM", "ESPIONAGE", "FISHHOOK", "GALVANIZE",
             "HYPHEN", "IVORY", "JIGSAW", "KEYHOLE", "LUXURY", "MEGAHERTZ", "NIGHTCLUB", "OXYGEN",
             "PNEUMONIA", "QUIZ", "RHYTHM", "SUBWAY", "TRANSCRIPT", "UTOPIA", "VOODOO", "WALKWAY", "YACHT", "ZODIAC"];

/**
 *
 * Selects a random secret word from the list.
 *
 * @returns {string} - A random from the list to initialize
 *                     the game's secret word.
 *
 * */
function secretWord() {
  let index = Math.floor(1 + Math.random() * words.length);
  return words[index - 1];
}

/**
 *
 * File exports.
 * */
export {secretWord};

