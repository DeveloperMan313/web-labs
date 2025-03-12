const MAX_LENGTH = 20;
const MAX_DECIMAL_VALUE = 1000000;

let a = '0';
let b = '';
let expressionResult = '';
let selectedOperation = null;
let colorTheme = 'light';
let clearOnDigit = false;

// преобразование значения в верный формат строки
const getValueString = function (str) {
    let value = +str;
    if (value > MAX_DECIMAL_VALUE) {
        str = value.toExponential();
    }
    return str;
}

// отрисовка числа на экране калькулятора
const renderValueString = function (str) {
    resultElement.innerHTML = getValueString(str);
}

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
const resultElement = document.getElementById('result');
// окно вывода последней операции
const historyElement = document.getElementById('history');

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
        if (getValueString(a).length >= MAX_LENGTH) return;
        if ((digit != '.' && digit != '0') || (digit == '.' && !a.includes(digit)) || (digit == '0' && a != '0')) {
            if (a == '0' && digit != '.')
                a = '';
            a += digit;
            renderValueString(a);
        }
    } else {
        if (getValueString(b).length >= MAX_LENGTH) return;
        if ((digit != '.' && digit != '0') || (digit == '.' && !b.includes(digit)) || (digit == '0' && a != '0')) {
            if (digit == '.' && b == '') b = '0';
            b += digit;
            renderValueString(b);
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
    handleOperationChain();
    callback();
    renderValueString(a);
}

// установка колбек-функций для кнопок операций
document.getElementById('btn_op_sign').onclick = function () {
    handleFuncBtn(() => {
        historyElement.innerHTML = `-(${getValueString(a)})`;
        a = (-a).toString();
    });
}
document.getElementById('btn_op_percent').onclick = function () {
    handleFuncBtn(() => {
        historyElement.innerHTML = `${getValueString(a)}%`;
        a = (+a * 0.01).toString();
    });
}
document.getElementById('btn_op_back').onclick = function () {
    handleFuncBtn(() => {
        historyElement.innerHTML = '';
        a = a.slice(0, -1);
        if (a === '')
            a = '0';
    });
}
document.getElementById('btn_op_sqrt').onclick = function () {
    handleFuncBtn(() => {
        if ((+a) < 0)
            return;
        historyElement.innerHTML = `√(${getValueString(a)})`;
        a = Math.sqrt(a).toString();
    });
}
document.getElementById('btn_op_2grade').onclick = function () {
    handleFuncBtn(() => {
        historyElement.innerHTML = `(${getValueString(a)})^2`;
        a = (a ** 2).toString();
    });
}
document.getElementById('btn_op_factorial').onclick = function () {
    handleFuncBtn(() => {
        if (a.includes('.') || (+a) < 0 || (+a) > 20)
            return;
        historyElement.innerHTML = `${getValueString(a)}!`;
        let rval = 1;
        for (let i = 2; i <= a; i++)
            rval = rval * i;
        a = rval.toString();
    });
}
document.getElementById('btn_op_addthousand').onclick = function () {
    handleFuncBtn(() => {
        if (a == '0')
            return;
        historyElement.innerHTML = `${getValueString(a)} * 1000`;
        a += '000';
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
    a = '0';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    renderValueString('0');
    historyElement.innerHTML = '';
}

// кнопка очищения
document.getElementById('btn_op_clear').onclick = clearState;

const calculateResult = function () {
    if (b === '' || !selectedOperation)
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

    historyElement.innerHTML = `${getValueString(a)} ${selectedOperation} ${getValueString(b)}`;
    a = expressionResult.toString();
    renderValueString(a);
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
