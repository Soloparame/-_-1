// Select the display element
const display = document.getElementById('display');

// Initialize variables
let currentInput = '';  
let expression = '';    // Store the full expression to display
let operator = '';      // Store the selected operator
let isOperatorClicked = false; // Track if an operator was clicked

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle button click
function handleButtonClick(event) {
    const buttonValue = event.target.getAttribute('data-value');

    if (buttonValue === 'C') {
        // Clear the input
        currentInput = ''; 
        expression = '';
        operator = '';
        isOperatorClicked = false;
        updateDisplay('0');
    } else if (buttonValue === '=') {
        // Perform calculation
        if (expression && currentInput) {
            expression += currentInput; // Add the final input to the expression
            currentInput = evaluate(expression); // Evaluate the full expression
            updateDisplay(currentInput); // Display the result
            expression = ''; // Clear the expression
            isOperatorClicked = false;
        }
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        // Store the operator and add to the expression
        if (currentInput) {
            expression += currentInput + ' ' + buttonValue + ' ';
            currentInput = '';
            updateDisplay(expression);  // Display the full expression with the operator
            isOperatorClicked = true;
        }
    } else {
        // Append number or decimal to the current input
        currentInput += buttonValue;
        updateDisplay(expression + currentInput); // Display the full expression with the new input
        isOperatorClicked = false; // Allow number input after operator
    }
}

// Function to evaluate the expression
function evaluate(expression) {
    try {
        return (new Function('return ' + expression))();  // Safely evaluate the expression
    } catch (error) {
        return "Error";
    }
}

// Add event listeners to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

// Initialize display
updateDisplay('0');
