/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for creating the window
 * and logic for the bmi calculator app.
 *
 * */

/**
 *
 * File imports
 * */
import { configWindow } from '../window_config';
import { createCalculatorUi } from './bmi-app_ui';


/**
 *
 * Counter for all bmi app window instances.
 * */
var idCounter = 0;

/**
 *
 * Creates a complete instance of the BMI calculator application
 * with the specified width and height. Invokes window configuration and
 * the ui creation files from within the /src directory.
 *
 * @param {number} width - Defines width of the window.
 * @param {number} height - Defines height of the window.
 *
 * @returns {HTMLDivElement} - Window element that is to be created
 *                             on top of the windows stack and be in focus.
 *
 * */
export function createBmiAppWindow(width, height) {

  const appDiv = document.createElement('div');
  configWindow(appDiv, width, height, idCounter, 'bmi_app', 'Bmi Calculator');

  const bmiDiv = createCalculatorUi();
  appDiv.appendChild(bmiDiv);
  const calculateBtn = bmiDiv.children[4];

  calculateBtn.addEventListener('click', () => {

    let heightTextfield = bmiDiv.children[0];
    let weightTextfield = bmiDiv.children[2];
    let output = bmiDiv.children[6];

    let bmi = calculateBmi(parseInt(heightTextfield.value), parseInt(weightTextfield.value));
    output.value = 'Your BMI is ' + parseFloat(bmi).toFixed(2);
  })

  /**
   *
   * Simple calculation for getting the body mass index.
   *
   * @param {number} weight - Weight value.
   * @param {number} height - Height value.
   *
   * @returns {number} - Body mass index.
   *
   * */
  function calculateBmi(height, weight) {
    return ( weight / ( height/100 * height/100 ) );
  }

  return appDiv;
}
