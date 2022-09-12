// A class for the previous and current opurand
class Calculator {
    constructor(preOpurandTextElement, currentOpurandTextElement ) {
        this.preOpurandTextElement = preOpurandTextElement;
        this.currentOpurandTextElement = currentOpurandTextElement;
        this.clear()
    }
//Different functions 
    clear() {
        this.currentOpurand = '';
        this.preOpurand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOpurand = this.currentOpurand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentOpurand.includes('.')) return
        this.currentOpurand = this.currentOpurand.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.currentOpurand === '') return
        if (this.preOpurand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.preOpurand = this.currentOpurand;
        this.currentOpurand = ' ';
    }

    compute() {
        let computation
        const prev = parseFloat(this.preOpurand);
        const current = parseFloat(this.currentOpurand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        
        }
        this.currentOpurand =computation;
        this.operation = undefined;
        this.preOpurand = '';

    }
//function for 
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decDigits = stringNumber.split('.')[1];
        let intDisplay 
        if (isNaN(intDigits)) {
            intDisplay = ''
        }
        else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decDigits != null) {
            return `${intDisplay}.${decDigits}`
        }
        else {
            return intDisplay
        }
    
    }
//function for output in the display
    updateDisplay() {
this.currentOpurandTextElement.innerText = 
this.getDisplayNumber(this.currentOpurand);
if (this.operation != null) {
    this.preOpurandTextElement.innerText = 
    `${this.getDisplayNumber(this.preOpurand)} ${this.operation}`
}
else {
    this.preOpurandTextElement.innerText = ''
}

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-op]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-allclear]');
const  preOpurandTextElement= document.querySelector('[data-pre-opurand]');
const  currentOpurandTextElement= document.querySelector('[data-current-opurand]');

const calculator = new Calculator(preOpurandTextElement, currentOpurandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})