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
 * Enables item to become a drop-target - draggable
 * windows can be dropped on it and dragged over it.
 *
 * @param {HTMLElement} item - Item that is being made droppable.
 * @returns {void}
 *
 * */
function makeDroppable(item) {

  item.addEventListener('dragenter', dragEnter);
  item.addEventListener('dragover', dragOver);
  item.addEventListener('drop', drop);

  /**
   *
   * Event based function that enables draggable objects
   * to be dragged over the window, on entering the
   * window area.
   *
   * Enables the window to become a drop-target.
   *
   * @param {DragEvent} event - Dragging event.
   * @returns {void}
   *
   * */
  function dragEnter (event) {
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
  function dragOver (event) {
    event.preventDefault();
  }

  /**
   *
   * Event based function that enables draggable
   * objects to be dropped on the target (the object
   * to which the function is attached)
   *
   * @param {DragEvent} event - Dragging event.
   * @returns {void}
   *
   * */
  function drop (event) {

    const data = event.dataTransfer.getData('text/plain').split(',');
    const id = data[0];
    const draggedElement = document.getElementById(id);

    draggedElement.style.opacity = '1';
    draggedElement.style.left = event.clientX + parseInt(data[1], 10) + 'px';
    draggedElement.style.top = event.clientY + parseInt(data[2], 10) + 'px';

    event.dataTransfer.clearData('text/plain');
  }
}

/**
 *
 * File exports.
 * */
export {makeDroppable};

