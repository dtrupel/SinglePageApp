/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for establishing the connection
 * with the server via a web socket to enable data
 * transmission.
 *
 * */

/**
 *
 * An instance of a web socket.
 * */
var webSocket;

/**
 *
 * Initializes the web socket with the given url,
 * sets up fundamental socket functions.
 *
 * Includes a listener attached to 'send' button
 * to enable sending the messages.
 *
 * @param {string} url - The server to connect to.
 * @param {HTMLDivElement} div - The DOM div object on which the connection is
 *                               currently going on (chat app instance).
 * @param {string} username - Username to be displayed in the chat room.
 * @returns {WebSocket} - Complete preconfigured instance of the web socket.
 *
 * */
function connect(url, div, username) {

  webSocket = new WebSocket(url);

  webSocket.onopen = () => {
      console.log("The websocket is now open.");
  };

  webSocket.onmessage = (event) => {

    let usr = JSON.parse(event.data).username;
    if (JSON.parse(event.data).type !== 'heartbeat') {
      displayMessage(`${usr}: ` + JSON.parse(event.data).data);
    }
  }

    webSocket.onclose = () => {
      console.log("The websocket is now closed.");
    }

  let sendButton = div.children[1].children[2].children[1];
  sendButton.addEventListener("click", () => {

    sendMessage();

    /**
     *
     * Detects the input, transforms data to a JSON format
     * and pushes it to the server via a web socket if the
     * connection is valid.
     *
     * Otherwise, logs the error and does nothing.
     *
     * @returns {void}
     *
     * */
    function sendMessage() {

      let inputArea = div.children[1].children[2].children[0];

      let messageText = inputArea.value;
      let apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd';
      let data =
        {
          "type": "message",
          "data" : messageText,
          "username": username,
          "key": apiKey
        };

      if (!webSocket || webSocket.readyState === 3) {
        console.log("The websocket is not connected to a server.");
      } else {
        webSocket.send(JSON.stringify(data));
        inputArea.value = "";
      }
    }
  });

  /**
   *
   * Displays a message to the output section
   * on the chat application window.
   *
   * @param {string} message - The message to display.
   * @returns {void}
   *
   * */
  function displayMessage(message) {

    let now = new Date();
    let timestamp = now.toLocaleTimeString();

    let outputArea = div.children[1].children[0];

    outputArea.innerHTML += `${timestamp} ${message} <br>`;
    outputArea.scrollTop = outputArea.scrollHeight;
  }

  return webSocket;
}

/**
 *
 * Closes the connection with the server.
 *
 * @returns {void}
 *
 * */
function disconnect() {
  webSocket.close();
}

/**
 *
 * File exports.
 * */
export { connect, disconnect };
