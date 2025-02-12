let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;
let colorTheme = 'light';

// окно вывода результата
const outputElement = document.getElementById('result');

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit;
        }
        outputElement.innerHTML = a;
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit;
            outputElement.innerHTML = b;
        }
    }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function () {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
    }
});

// установка колбек-функций для кнопок операций
document.getElementById('btn_op_sign').onclick = function () {
    if (a === '') return;
    a = (-a).toString();
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_percent').onclick = function () {
    if (a === '') return;
    a = (+a * 0.01).toString();
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_back').onclick = function () {
    if (a === '') return;
    a = a.slice(0, -1);
    if (a === '')
        a = '0';
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_sqrt').onclick = function () {
    if (a === '') return;
    a = Math.sqrt(a).toString();
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_2grade').onclick = function () {
    if (a === '') return;
    a = (a ** 2).toString();
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_factorial').onclick = function () {
    if (a === '') return;
    let rval = 1;
    for (let i = 2; i <= a; i++)
        rval = rval * i;
    a = rval.toString();
    outputElement.innerHTML = a;
}
document.getElementById('btn_op_addthousand').onclick = function () {
    if (a === '') return;
    a = (a * 1000).toString();
    outputElement.innerHTML = a;
}

document.getElementById('btn_op_mult').onclick = function () {
    if (a === '') return;
    selectedOperation = 'x';
}
document.getElementById('btn_op_plus').onclick = function () {
    if (a === '') return;
    selectedOperation = '+';
}
document.getElementById('btn_op_minus').onclick = function () {
    if (a === '') return;
    selectedOperation = '-';
}
document.getElementById('btn_op_div').onclick = function () {
    if (a === '') return;
    selectedOperation = '/';
}

// кнопка очищения
document.getElementById('btn_op_clear').onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = '0';
}

// кнопка расчёта результата
document.getElementById('btn_op_equal').onclick = function () {
    if (a === '' || b === '' || !selectedOperation)
        return;

    switch (selectedOperation) {
        case 'x':
            expressionResult = (+a) * (+b);
            break;
        case '+':
            expressionResult = (+a) + (+b);
            break;
        case '-':
            expressionResult = (+a) - (+b);
            break;
        case '/':
            expressionResult = (+a) / (+b);
            break;
    }

    a = expressionResult.toString();
    outputElement.innerHTML = a;
}

document.getElementById('color-theme').onclick = function () {
    if (colorTheme === 'light') {
        document.body.style.backgroundColor = 'rgb(30, 30, 35)';
        document.getElementById('color-theme').style.filter = 'invert(1)';
        document.getElementById('author').style.filter = 'invert(1)';
        colorTheme = 'dark';
    } else if (colorTheme === 'dark') {
        document.body.style.backgroundColor = 'rgb(225, 225, 220)';
        document.getElementById('color-theme').style.filter = '';
        document.getElementById('author').style.filter = '';
        colorTheme = 'light';
    }
}
