'use strict';

const { argv } = require('node:process');

function compressNumbers(numbers) {
    numbers = Array.from(numbers);

    let rowFirst = 0, rowLast = -Infinity;
    let compressed = [];

    numbers.push(-Infinity);
    for (let num of numbers) {
        if (num == rowLast + 1) {
            rowLast++;
            continue;
        }
        if (num != rowLast + 1) {
            if (rowFirst == rowLast) {
                compressed.push(rowFirst.toString());
            }
            if (rowFirst < rowLast) {
                compressed.push(`${rowFirst}-${rowLast}`);
            }
            rowFirst = rowLast = num;
        }
    }

    return compressed.join();
}

const numbers = argv.slice(2).map(str => parseInt(str, 10));
console.log(compressNumbers(numbers));
