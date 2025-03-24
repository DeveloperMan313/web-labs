'use strict';

const { argv } = require('node:process');

function euclid() {
    const argLen = arguments.length;
    if (argLen < 2) {
        throw new Error('must be at least 2 arguments');
    }
    for (let i = 0; i < argLen; i++) {
        const arg = arguments[i];
        if (typeof arg != 'number') {
            throw new Error(`arg at idx ${i} "${arg}" is not a number`);
        }
        if (!Number.isInteger(arg)) {
            throw new Error(`arg at idx ${i} "${arg}" is not an integer`);
        }
        if (arg < 1) {
            throw new Error(`arg at idx ${i} "${arg}" is not a positive integer`);
        }
    }

    let gcd = arguments[0];
    for (let i = 1; i < argLen; i++) {
        gcd = euclid2(gcd, arguments[i]);
    }

    return gcd;
}

function euclid2(a, b) {
    while (a * b > 0) {
        if (a >= b) a %= b;
        else b %= a;
    }
    return (a > b) ? a : b;
}

const numbers = argv.slice(2).values().map(parseFloat);
console.log(euclid(...numbers));
