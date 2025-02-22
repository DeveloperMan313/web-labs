let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;
let colorTheme = 'light';
let clearOnDigit = false;

// обработка нажатия на функциональную кнопку после "=" или другой функции без "="
const handleOperationChain = function () {
    if (clearOnDigit) {
        clearOnDigit = false;
        b = '';
    } else if (a && b) {
        calculateResult();
        clearOnDigit = false;
        b = '';
    }
}

// окно вывода результата
const outputElement = document.getElementById('result');

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

function onDigitButtonClicked(digit) {
    if (digit.length != 1 || !'0123456789.'.includes(digit))
        return;
    if (clearOnDigit) {
        clearState();
        clearOnDigit = false;
    }
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

// ввод цифр и точки с помощью клавиатуры
document.onkeydown = function (e) {
    onDigitButtonClicked(e.key);
}

// обёртка для функций-обработчиков функциональных кнопок
const handleFuncBtn = function (callback) {
    if (a === '') return;
    handleOperationChain();
    callback();
    outputElement.innerHTML = a;
}

// установка колбек-функций для кнопок операций
document.getElementById('btn_op_sign').onclick = function () {
    handleFuncBtn(() => {
        a = (-a).toString();
    });
}
document.getElementById('btn_op_percent').onclick = function () {
    handleFuncBtn(() => {
        a = (+a * 0.01).toString();
    });
}
document.getElementById('btn_op_back').onclick = function () {
    handleFuncBtn(() => {
        a = a.slice(0, -1);
        if (a === '')
            a = '0';
    });
}
document.getElementById('btn_op_sqrt').onclick = function () {
    handleFuncBtn(() => {
        a = Math.sqrt(a).toString();
    });
}
document.getElementById('btn_op_2grade').onclick = function () {
    handleFuncBtn(() => {
        a = (a ** 2).toString();
    });
}
document.getElementById('btn_op_factorial').onclick = function () {
    handleFuncBtn(() => {
        let rval = 1;
        for (let i = 2; i <= a; i++)
            rval = rval * i;
        a = rval.toString();
    });
}
document.getElementById('btn_op_addthousand').onclick = function () {
    handleFuncBtn(() => {
        a = (a * 1000).toString();
    });
}

document.getElementById('btn_op_mult').onclick = function () {
    handleFuncBtn(() => {
        selectedOperation = 'x';
    });
}
document.getElementById('btn_op_plus').onclick = function () {
    handleFuncBtn(() => {
        selectedOperation = '+';
    });
}
document.getElementById('btn_op_minus').onclick = function () {
    handleFuncBtn(() => {
        selectedOperation = '-';
    });
}
document.getElementById('btn_op_div').onclick = function () {
    handleFuncBtn(() => {
        selectedOperation = '/';
    });
}

const clearState = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = '0';
}

// кнопка очищения
document.getElementById('btn_op_clear').onclick = clearState;

const calculateResult = function () {
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
    clearOnDigit = true;
}

// кнопка расчёта результата
document.getElementById('btn_op_equal').onclick = calculateResult;

document.getElementById('color-theme').onclick = function () {
    if (colorTheme === 'light') {
        document.body.style.backgroundColor = 'var(--color-darkest)';
        document.getElementById('color-theme').style.filter = 'invert(1)';
        colorTheme = 'dark';
    } else if (colorTheme === 'dark') {
        document.body.style.backgroundColor = 'var(--color-light)';
        document.getElementById('color-theme').style.filter = '';
        colorTheme = 'light';
    }
}
