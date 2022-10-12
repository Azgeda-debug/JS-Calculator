// Variables

const numbers = document.querySelectorAll('.number');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const currentNumber = document.querySelector('.current-number');
const previousNumber = document.querySelector('.previous-number');
const mathSign = document.querySelector('.math-sign');
const historySection = document.querySelector('.history-section');
const clearHistoryBtn = document.querySelector('.clear-history');
const clearCalculationsBtn = document.querySelector('.clear');

let result = '';

// Events Listener

numbers.forEach(button => button.addEventListener('click', (e) =>
{
    const number = e.target.dataset.value;

    if(currentNumber.innerHTML.includes('.') && number === '.')
    {
        return;
    }
    if(currentNumber.innerHTML === '' && number === '.')
    {
        return currentNumber.innerHTML = 0 + '.';
    }
    currentNumber.innerHTML += number;
}));

signs.forEach(button => button.addEventListener('click', (e) =>
{
    const sign = e.target.dataset.value;

    if(currentNumber.innerHTML === '' && sign === '-')
    {
        currentNumber.innerHTML = '-'; 
    }
    if(currentNumber.innerHTML === '-' && sign === '-' || currentNumber.innerHTML === '-' && sign === '+' || currentNumber.innerHTML === '-' && sign === '*' || currentNumber.innerHTML === '-' && sign === '/' || currentNumber.innerHTML === '-' && sign === '^2')
    {
        return;
    }

    if(mathSign.innerHTML !== '')
    {
        calculationResult();
    }   

    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = e.target.dataset.value;
    currentNumber.innerHTML = '';

}));

const calculationResult = () =>
{
    if(currentNumber.innerHTML !== '' && previousNumber.innerHTML !== '')
    {
        let a = Number(currentNumber.innerHTML);
        let b = Number(previousNumber.innerHTML);
        const operator = mathSign.innerHTML;

        switch(operator)
        {
            case '+':
            result = a + b;
            break;
            case '-':
            result = b - a;
            break;
            case '*':
            result = a * b;
            break;
            case '/':
            result = b / a;
            break;
            case '^2':
            result = Math.pow(b,a);
            break;
        }

        addToHistory();
        previousNumber.innerHTML = '';
        currentNumber.innerHTML = result;
        mathSign.innerHTML = '';
    }
}

equals.addEventListener('click', calculationResult);

const addToHistory = () =>
{
    const newHistoryItem = document.createElement('li');
    newHistoryItem.classList = 'history-item';
    newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`;
    clearHistoryBtn.classList.add('active');

    historySection.appendChild(newHistoryItem);
}

clearHistoryBtn.addEventListener('click', () =>
{
    historySection.innerHTML = '';
    clearHistoryBtn.classList.remove('active');
});

clearCalculationsBtn.addEventListener('click', () =>
{
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
    result = '';
});