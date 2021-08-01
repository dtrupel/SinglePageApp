/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for making the windows
 * draggable on the screen.
 *
 * Two listeners that also make the same elements
 * droppable are added for the sake of potential
 * overlap among multiple windows.
 *
 * */

/**
 *
 * Keeps track of the top element's depth axis value.
 * */
var topElementZIndex = 1000;

/**
 *
 * Enables item to become draggable on the screen.
 *
 * @param {HTMLDivElement} item - Item that is being made draggable.
 * @returns {number} - Needs to provide a top element's depth axis value
 *                     on every window creation to keep the elements stacking
 *                     on top of one another.
 *
 * */
function makeDraggable(item) {

  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragenter', dragEnter);
  item.addEventListener('dragover', dragOver);

  /**
   *
   * Listener for starting to perform drag operation.
   *
   * Gets the current position of the dragged window
   * and passes it via event's data transfer field.
   *
   * @param {DragEvent} event - Dragging event.
   * @returns {void}
   *
   * */
  function dragStart(event) {

    const left = parseInt(item.style.getPropertyValue('left'), 10) - event.clientX;
    const top = parseInt(item.style.getPropertyValue('top'), 10) - event.clientY;

    setToTop(item);

    event.dataTransfer.setData("text/plain", event.target.id + ',' + left + ',' + top);
    event.dataTransfer.dropEffect = "move";

  }

  /**
   *
   * Sets the current window's depth value to the highest,
   * so that it always remains on focusable (on top of the
   * other windows).
   *
   * @param {HTMLDivElement} item - Window specified to set as focusable.
   *
   * */
  function setToTop(item) {

    if(topElementZIndex === 9999)
      topElementZIndex = 1000;

    topElementZIndex += 1;
    item.style.zIndex = `${topElementZIndex}`;
  }

  /**
   *
   * Event based function that enables other elements
   * to be dragged over the window, on entering the
   * window area.
   *
   * Enables the window to become a drop-target.
   *
   * @param {DragEvent} event - Dragging event.
   * @returns {void}
   *
   * */
  function dragEnter(event) {
    event.preventDefault();
  }

  /**
   *
   * Event based function that enables draggable objects
   * to be dragged over the window during the overlap.
   *
   * Enables the window to become a drop-target.
   *
   * @param {DragEvent} event - Dragging event.
   * @returns {void}
   *
   * */
  function dragOver(event) {
    event.preventDefault();
  }

  return topElementZIndex;
}

/**
 *
 * File exports.
 * */
export {makeDraggable};
