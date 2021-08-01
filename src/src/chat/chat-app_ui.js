/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for generating the ui
 * for the chat application.
 *
 * */

/**
 *
 * Creates a window for the user to change the
 * username. This window should ALWAYS open on
 * running the chat app IF AND ONLY IF the
 * username does not previously exist in cache memory.
 *
 * Otherwise, it runs when the user decides to change
 * the existing username.
 *
 * @returns {HTMLDivElement} - DOM div object consisting of a window
 *                             for updating the username.
 *
 * */
function createChangeUsernameWindow() {

  const registerDiv = document.createElement('div');
  registerDiv.classList.add('reg_div');

  const textField = document.createElement('input');
  textField.classList.add('name_textfield');
  textField.type = 'text';

  const button = document.createElement('input');
  button.classList.add('save-usr_btn');
  button.type = 'button';
  button.value = 'Save';

  const output = document.createElement('output');
  output.classList.add('reg_output')
  output.innerHTML = 'Enter a username of length 4-12 and press on Save.';

  const goBackBtn = document.createElement('input');
  goBackBtn.type = 'button';
  goBackBtn.classList.add('go-back_btn');
  goBackBtn.value = 'Back to chat';

  registerDiv.appendChild(document.createElement('hr'));
  registerDiv.appendChild(output); //1
  registerDiv.appendChild(document.createElement('hr'));
  registerDiv.appendChild(textField); //3
  registerDiv.appendChild(document.createElement('hr'));
  registerDiv.appendChild(button); //5
  registerDiv.appendChild(document.createElement('hr'));
  registerDiv.appendChild(goBackBtn);//7

  return registerDiv;
}

/**
 *
 * Creates a user interface for the chat application.
 *
 * @returns {HTMLDivElement} - DOM div object containing the chat application.
 *
 * */
function createChatUi() {

  const chatDiv = document.createElement('div');
  chatDiv.classList.add('chat_div');

  const outputArea = document.createElement('output');
  outputArea.classList.add('display_area');

  chatDiv.appendChild(outputArea); //0, 0
  chatDiv.appendChild(document.createElement('hr'))

  const inputDiv = document.createElement('div'); //0, 2
  inputDiv.classList.add('input_div');

  const inputArea = document.createElement('textarea');
  inputArea.classList.add('input_area');
  inputArea.placeholder = 'Type your message here';

  const sendButton = document.createElement('input');
  sendButton.classList.add('send_button');
  sendButton.type = 'button';

  const changeUsernameDiv = document.createElement('div');
  changeUsernameDiv.classList.add('footer_div');

  const changeUsername = document.createElement('input');
  changeUsername.classList.add('change-usr_btn');
  changeUsername.type = 'button';
  changeUsername.value = "Change username";
  changeUsernameDiv.appendChild(changeUsername);

  inputDiv.appendChild(inputArea);
  inputDiv.appendChild(sendButton);
  chatDiv.appendChild(inputDiv);
  chatDiv.appendChild(changeUsernameDiv);

  return chatDiv;
}

/**
 *
 * File exports.
 * */
export { createChatUi, createChangeUsernameWindow };
