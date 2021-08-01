/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script configuring common functionalities
 * among windows created within the personal
 * web desktop application.
 *
 * */

import { makeDraggable } from './draggable'

/**
 *
 * Fields that apply to all created windows, used
 * to position windows on the screen and to prevent
 * infinite windows from ever being created.
 *
 * */
var currentMarginTop = 0;
var currentMarginLeft = 0;
var windowCounter = 0;

function configWindow(div, width, height, counter, name, title) {

  stretchToSize(div, [width, height]);
  setupFunctionalProperties(div, name, counter);
  setupDisplayProperties(div, counter++);
  div.appendChild(setupTitleHeader(div, title));
  incrementWindowCounter();
  setInFocus(div);
}

/**
 *
 * Sets the current window's top margin to
 * a specified value.
 *
 * The function is exported at the bottom of the file.
 *
 * @param {number} value - New value to be assigned to window's top margin value.
 * @returns {void}
 *
 * */
function setMarginTop(value) {
  currentMarginTop = value;
}

/**
 *
 * Sets the current window's left margin to
 * a specified value.
 *
 * The function is exported at the bottom of the file.
 *
 * @param {number} value - New value to be assigned to window's left margin value.
 * @returns {void}
 *
 * */
function setMarginLeft(value) {
  currentMarginLeft = value;
}

/**
 *
 * Resets the window counter to the initial value of 0.
 *
 * The function is exported at the bottom of the file.
 *
 * @returns {void}
 *
 * */
function resetWindowCounter() {
  windowCounter = 0;
}

/**
 *
 * Increments the window counter value by 1.
 *
 * @returns {void}
 *
 * */
function incrementWindowCounter() {
  windowCounter += 1;
}

/**
 *
 * Stretch specified DOM object to a
 * specified size given in 2 dimensions.
 *
 * @param {Node} div - Current DOM object being stretched to a given size.
 * @param {Array} params - Values of desired window's width and height passed
 *                         as an array of 2 values.
 * @returns {void}
 *
 * */
function stretchToSize(div, params) {

  div.style.width = `${params[0]}px`;
  div.style.height = `${params[1]}px`;
}

/**
 *
 * Sets up basic common functional properties shared
 * among all windows created on the screen.
 *
 * @param {Node} div - Current DOM object to set properties on.
 * @param {string} name - Responsible for differentiating between
 *                        windows of different purposes.
 * @param {number} counter - Responsible for differentiating between
 *                           windows of the same purpose.
 * @returns {void}
 *
 * */
function setupFunctionalProperties(div, name, counter) {

  div.id = name + counter;
  div.classList.add('window');
  div.draggable = true;
  div.cursor = 'move';

  incrementMarginTop(50);
  incrementMarginLeft(50);
}

/**
 *
 * Increments the value of the current
 * window's top margin.
 *
 * @param {number} value - Value added to the top margin value.
 * @returns {void}
 *
 * */
function incrementMarginTop(value) {
  currentMarginTop += value;
  if(currentMarginTop > 250)
    currentMarginTop = 0;
}

/**
 *
 * Increments the value of the current
 * window's left margin.
 *
 * @param {number} value - Value added to the left margin value.
 * @returns {void}
 *
 * */
function incrementMarginLeft(value) {
  currentMarginLeft += value;
  if(currentMarginLeft >= 1250)
    currentMarginLeft = 0;
}

/**
 *
 * Sets up basic common display properties shared
 * among all windows created on the screen.
 *
 * @param {Node} div - Current DOM object to set properties on.
 * @param {number} counter - Defines the lastly created element by
 *                           always remaining the highest value being
 *                           assigned to object's z-index value.
 * @returns {void}
 *
 * */
function setupDisplayProperties(div, counter) {

  div.style.zIndex = counter + '';
  div.style.top = currentMarginTop + 'px';
  div.style.left = currentMarginLeft + 'px';
}

/**
 *
 * Appends a title header with a title and a close
 * button on creation to the currently chosen window.
 *
 * @param {Node} div - Current DOM object which is being
 *                     added its own title header.
 * @paramm {string} title - Value of the window's title.
 * @returns {HTMLHeadingElement} - DOM div object
 *
 * */
function setupTitleHeader(div, title) {

  const titleHeader = document.createElement('h2');
  titleHeader.innerHTML = title;
  titleHeader.appendChild(setupCloseButton(div));

  return titleHeader;
}

/**
 *
 * Appends a close button to the title header
 * and attaching a listener to it responsible
 * for performing the closing of a chosen window.
 *
 * @param {Node} div - Current DOM object to which the close
 *                     button shall be appended.
 * @returns {HTMLButtonElement} - DOM button object.
 *
 * */
function setupCloseButton(div) {

  const x = document.createElement('button');
  x.classList.add('xBtn');
  x.id = 'xBtn' + div.id;
  x.innerHTML = 'X';

  x.onclick = () => {
    removeWindow();
  }

  /**
   *
   * Removes the current window from the screen
   * decrementing the margin values and window counter.
   *
   * @returns {void}
   *
   * */
  function removeWindow() {
    document.getElementById('canvas').removeChild(div);
    decrementWindowCounter();
    decrementMarginLeft(50);
    decrementMarginTop(50);
  }
  return x;
}

/**
 *
 * Decrements the window counter value by 1.
 *
 * @returns {void}
 *
 * */
function decrementWindowCounter() {
  windowCounter -= 1;
}

/**
 *
 * Decrements the value of the current
 * window's left margin.
 *
 * @param {number} value - Value subtracted from the left margin value.
 * @returns {void}
 *
 * */
function decrementMarginLeft(value) {
  currentMarginLeft -= value;
  if(currentMarginLeft <= 0)
    currentMarginLeft = 0;
}

/**
 *
 * Decrements the value of the current
 * window's top margin.
 *
 * @param {number} value - Value subtracted from the top margin value.
 * @returns {void}
 *
 * */
function decrementMarginTop(value) {
  currentMarginTop -= value;
  if(currentMarginTop < 0)
    currentMarginTop = 250
}


/**
 *
 * Appends a footer to the currently chosen window.
 *
 * @param {Node} div - Current DOM object to add footer to.
 * @param {string} name - Responsible for differentiating between
 *                        footers of windows with the same purpose.
 * @returns {HTMLDivElement} - DOM div object.
 *
 * */
function setupFooter(div, name) {

  const footerDiv = document.createElement('div');
  footerDiv.id = name + div.id;

  footerDiv.style.backgroundColor = '#037C5C';
  footerDiv.style.fontSize = '20px';
  footerDiv.style.color = 'gold';
  footerDiv.style.padding = '20px';
  footerDiv.style.textAlign = 'center';
  footerDiv.style.marginTop = '20px';

  return footerDiv;
}

/**
 *
 * Makes the current DOM object draggable and
 * Sets its z-index to the currently highest value,
 * making it appear to be the focused element.
 *
 * @param {Node} div - Current DOM object being focused.
 * @return {void}
 *
 * */
function setInFocus(div) {
  const topZIndex = makeDraggable(div);
  div.style.zIndex = topZIndex + 1 + '';
}

export {configWindow, setupFooter, setMarginLeft, setMarginTop, resetWindowCounter, windowCounter};
