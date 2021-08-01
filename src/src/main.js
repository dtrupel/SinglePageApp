/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Entry point for the personal web desktop application.
 *
 * */

/**
 *
 * File imports.
 * */
import { createMemoryGameWindow } from './memory/memory_game';
import { createChatAppWindow } from './chat/chat_app'
import { makeDroppable } from './droppable'
import { windowCounter, setMarginTop, setMarginLeft, resetWindowCounter } from './window_config'
import { createHangmanGameWindow } from './hangman/hangman_game'
import { createBmiAppWindow } from './bmi/bmi_app'

/**
 *
 * App logic - Setting up the main section droppable
 *             and enabling listeners for buttons to
 *             open up appropriate applications on click.
 *
 * */
const dropTarget = document.getElementById('canvas');
makeDroppable(dropTarget);

/**
 *
 * Runs memory game window.
 * */
const openMemoryBtn = document.getElementById('open_memory');
openMemoryBtn.onclick = () => {
  const newMemory = createMemoryGameWindow(4, 4, 450, 485);
  if(windowCounter >= 124) {
    alert('You can create a maximum of 125 windows per session.');
  }else {
    document.getElementById('canvas').appendChild(newMemory);
  }
};

/**
 *
 * Runs chat app window.
 * */
const openChatBtn = document.getElementById('open_chat');
openChatBtn.onclick = () => {
  const newChat = createChatAppWindow(450, 520);
  if(windowCounter >= 124) {
    alert('You can create a maximum of 125 windows per session.');
  }else {
    document.getElementById('canvas').appendChild(newChat);
  }
}

/**
 *
 * Runs hangman game window.
 * */
const openHangmanBtn = document.getElementById('open_hangman');
openHangmanBtn.onclick = () => {
  const newHangman = createHangmanGameWindow(450, 485);
  if(windowCounter >= 124) {
    alert('You can create a maximum of 125 windows per session.');
  }else {
    document.getElementById('canvas').appendChild(newHangman);
  }
}

/**
 *
 * Runs bmi app window.
 * */
const openBmiBtn = document.getElementById('open_bmi');
openBmiBtn.onclick = () => {
  const newBmi = createBmiAppWindow(450, 485);
  if (windowCounter >= 124) {
    alert('You can create a maximum of 125 windows per session.');
  } else {
    document.getElementById('canvas').appendChild(newBmi);
  }

}

/**
 *
 * Closes all windows.
 * */
const closeAllBtn = document.getElementById('close_all');
closeAllBtn.onclick = () => {
  document.getElementById('canvas').innerHTML = "";
  resetWindowCounter();
  setMarginTop(0);
  setMarginLeft(0);

}


