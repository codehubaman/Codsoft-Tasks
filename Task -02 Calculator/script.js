
document.addEventListener("DOMContentLoaded", function () {
    const resultDisplay = document.getElementById('result');
    const expressionDisplay = document.getElementById('expression');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let expression = '';
    let isResultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                expression = '';
                resultDisplay.textContent = '';
                expressionDisplay.textContent = '';
                isResultDisplayed = false;
                return;
            }

            if (value === '=') {
                if (expression && currentInput !== '') {
                    expression += ` ${currentInput}`;
                    let result = calculate(expression);
                    resultDisplay.textContent = result;
                    expressionDisplay.textContent = expression + ` = ${result}`;
                    currentInput = result;
                    expression = '';
                    isResultDisplayed = true;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (isResultDisplayed) {
                    expression = `${currentInput} ${value}`;
                    isResultDisplayed = false;
                } else if (currentInput !== '') {
                    expression += ` ${currentInput} ${value}`;
                } else if (expression !== '') {
                    expression = expression.slice(0, -1) + value; // Replace the last operator
                }

                currentInput = '';
                expressionDisplay.textContent = expression;
                return;
            }

            if (isResultDisplayed) {
                currentInput = '';
                isResultDisplayed = false;
            }

            currentInput += value;
            resultDisplay.textContent = currentInput;
            expressionDisplay.textContent = expression + ` ${currentInput}`;
        });
    });

    function calculate(expr) {
        try {
            return new Function('return ' + expr)();
        } catch {
            return 'Error';
        }
    }
});
