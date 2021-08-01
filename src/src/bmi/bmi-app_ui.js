/**
 *
 * Author: Domagoj Trupeljak
 * Version: v1.0
 * Date: 15th Jan, 2021
 *
 * Script responsible for generating the ui
 * for the bmi calculator application.
 *
 * */

/**
 *
 * Generates DOM div object and initializes
 * the required user interface fields for the app.
 *
 * @returns {HTMLDivElement} - DOM div element containing the app.
 *
 * */
function createCalculatorUi() {

  const bmiDiv = document.createElement('div');
  bmiDiv.classList.add('bmi_div');

  const heightTextfield = document.createElement('input');
  heightTextfield.type = 'number';
  heightTextfield.maxLength = 3;
  heightTextfield.min = '40';
  heightTextfield.max = '250';
  heightTextfield.classList.add('bmi_textfield');
  heightTextfield.placeholder = 'Enter your height in centimeters';

  const weightTextfield = document.createElement('input');
  weightTextfield.classList.add('bmi_textfield')
  weightTextfield.type = 'number';
  weightTextfield.min = '10';
  weightTextfield.max = '300';
  weightTextfield.maxLength = 3;
  weightTextfield.placeholder = "Enter your weight in kilograms";

  const calculateBtn = document.createElement('input');
  calculateBtn.classList.add('bmi-calculate_btn');
  calculateBtn.value = "Calculate";
  calculateBtn.type = 'button';

  const output = document.createElement('output');
  output.classList.add('bmi_output');

  bmiDiv.appendChild(heightTextfield);
  bmiDiv.appendChild(document.createElement('hr'));
  bmiDiv.appendChild(weightTextfield);
  bmiDiv.appendChild(document.createElement('hr'));
  bmiDiv.appendChild(calculateBtn);
  bmiDiv.appendChild(document.createElement('br'));
  bmiDiv.appendChild(output);

  return bmiDiv;
}

/**
 *
 * File exports.
 * */
export { createCalculatorUi };
