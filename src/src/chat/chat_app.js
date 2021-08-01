/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating a complete
 * instance of a chat application.
 *
 * */

/**
 *
 * File imports
 * */
import {configWindow} from '../window_config'
import {connect, disconnect} from './connection'
import {createChangeUsernameWindow, createChatUi} from './chat-app_ui';

/**
 *
 * Counter for all chat app window instances.
 * */
var idCounter = 0;

/**
 *
 * Username to be shown in the chat room.
 * */
var username = localStorage.getItem('name');

/**
 *
 * Creates a complete instance of the chat
 * application with the specified width and height.
 *
 * @param {number} width - Defines width of the window.
 * @param {number} height - Defines height of the window.
 *
 * @returns {HTMLDivElement} - Window element that is to be created
 *                             on top of the windows stack and be in focus.
 *
 * */
export function createChatAppWindow(width, height) {

  const appDiv = document.createElement('div');
  var chatDiv;
  var webSocket;

  configWindow(appDiv, width, height, idCounter, 'chat_app', 'Simple Chat');
  run();

  /**
   *
   * Runs the chat application upon configuring the window.
   *
   * Branches to rendering the screen for new username if
   * the username does not already exist in cache memory.
   *
   * Otherwise it starts the app.
   *
   * @returns {void}
   *
   * */
  function run() {
    if(localStorage.getItem('name').toString() === 'null') {
      newUsername();
    }else {
      startChat();
      changeUsernameListener();
    }

    /**
     *
     * Invokes ui files to render the window for changing
     * the username. Includes listeners for both saving
     * the username and/or going back to chat app.
     *
     * @returns {void}
     *
     * */
    function newUsername() {

      const registerDiv = createChangeUsernameWindow();
      appDiv.appendChild(registerDiv);

      const button = registerDiv.children[5];
      button.addEventListener('click', () => {

        saveAndReturn();

        /**
         *
         * Saves the username if it is valid
         * and returns back to chat.
         *
         * @returns {void}
         *
         * */
        function saveAndReturn() {

          if(saveUsername()) {
            localStorage.setItem('name', username);
            backToChat(registerDiv);
          }

          /**
           *
           * Checks if the username is valid to be stored.
           *
           * @returns {boolean}
           *
           * */
          function saveUsername() {

            let textField = registerDiv.children[3];
            username = textField.value;
            if(username === null  || username.length > 12 || username.length < 4) {
              alert("Enter a valid username.");
              return false;
            }
            return true;
          }

        }
      });

      const goBackBtn = registerDiv.children[7];
      goBackBtn.addEventListener('click', () => {
        backToChat(registerDiv);
      })

      /**
       *
       * Returns back to chat by destroying (removing
       * from its parent) the DOM div object for changing
       * the username, disconnecting from the chat and
       * starting the chat again.
       *
       * @param {HTMLDivElement} removeChild - DOM div object for creating the window
       *                           that is to be removed from the parent node.
       * @returns {void}
       *
       * */
      function backToChat(removeChild) {

        appDiv.removeChild(removeChild);
        disconnect();
        startChat();
        changeUsernameListener();
      }
    }

    /**
     *
     * Starts the chat by invoking the ui files to
     * create the appropriate chat window and establishes
     * a connection to the server.
     *
     * @returns {void}
     *
     * */
    function startChat() {
      chatDiv = createChatUi();
      appDiv.appendChild(chatDiv);
      webSocket = connect('ws://vhost3.lnu.se:20080/socket/', appDiv, username);
    }

    /**
     *
     * Sets up an event listener on the button for
     * changing the username.
     *
     * @returns {void}
     *
     * */
    function changeUsernameListener() {

      const changeUsername = chatDiv.children[3].children[0];
      changeUsername.addEventListener('click', () => {
        appDiv.removeChild(chatDiv);
        newUsername();
      })
    }
  }

  return appDiv;
}

