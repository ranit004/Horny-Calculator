class Calculator {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.reset();
        this.clickSound = document.getElementById('click-sound');
        this.errorSound = document.getElementById('error-sound');
    }

    playSound(sound) {
        sound.play();
    }

    reset() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.playSound(this.clickSound);
    }

    chooseOperation(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.playSound(this.clickSound);
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) {
            this.playSound(this.errorSound);
            return;
        }
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = result;
        this.operator = undefined;
        this.previousValue = '';
    }

    updateScreen() {
        this.screenElement.value = this.currentValue;
    }

    handleEqualSign() {
        this.compute();
        this.updateScreen();
        this.playSound(this.clickSound);
    }

    handleAllClear() {
        this.reset();
        this.updateScreen();
        this.playSound(this.clickSound);
    }
}


const calculatorScreen = document.querySelector('#calculator-screen');
const calculator = new Calculator(calculatorScreen);


const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (button.classList.contains('operator')) {
            calculator.chooseOperation(value);
            calculator.updateScreen();
        } else if (button.classList.contains('equal-sign')) {
            calculator.handleEqualSign();
        } else if (button.classList.contains('all-clear')) {
            calculator.handleAllClear();
        } else if (button.classList.contains('decimal')) {
            calculator.appendNumber(value);
            calculator.updateScreen();
        } else {
            calculator.appendNumber(value);
            calculator.updateScreen();
        }
    });
});