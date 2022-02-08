"use strict";
// Abstraction repetition

// Since functions are just values, they can be passed into another function as a value:
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);
// 0
// 1
// 2

// We can create a function value (for action) right away (when it is passed as an argument):
let labels = [];
repeat(5, function (i) {
    labels.push(`Unit ${i + 1}`)
})
console.log(labels)
// [ 'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5' ]

// HIGHER-ORDER FUNCTIONS
// Functions that operation on other functions, either by taking them as arguments or returning them.
// array.forEach is an example
console.log('---------------------control flow-----------------------------')

// Ex of control flow
function unless(test, then) {
    if (!test) { // Note that this can be: if (!test) then();
        then();
    }
}

repeat(3, n => {
    unless(n % 2 === 1, () => {
        console.log(n, "is even");
    })
})

// Import array
const SCRIPTS = require('./scripts.js');

// HIGHER-ORDER FUNCTIONS; filter, map, reduce

console.log('---------------------filter-----------------------------')

// FILTER OUT ELEMENTS THAT DON'T PASS A TEST (test is the callback you create)
function myFilter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

console.log(myFilter(SCRIPTS, script => script.living));
// This was a pure function - doesn't modify original array
// The above is to just show of the standard .filter() method works under the hood

// Ex using filter method
console.log(SCRIPTS.filter(script => script.direction === 'ttb'));

console.log('---------------------map-----------------------------')

// MAP - creates a new array populated with the results of calling a provided function on every element in the calling array.
// Map the SCRIPTS array to a new form
// First new filtered array of rtl scripts
let rtlScripts = SCRIPTS.filter(script => script.direction === 'rtl')
// Map by name
console.log(rtlScripts.map(scripts => scripts.name))

// How map works - transform is the callback you create
function myMap(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped
}
console.log('---------------------reduce-----------------------------')

// REDUCE
// Under the hood - accumulator is the callback
function myReduce(array, accumulator, start) {
    let current = start;
    for (let element of array) {
        current = accumulator(current, element);
    }
    return current;
}

console.log(myReduce([1, 2, 3, 4, 5], (a, b) => a + b, 0))

console.log('---------------------charCounter-----------------------------')
// Ex, find the script with the most characters:
function charCounter(script) {
    // Ranges is an array of Unicode character ranges, representing an upper and lower bound
    // This function reduces the ranges of a script by summing their sizes
    // [from, to] is the destructuring assignment syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
    if (charCounter(a) < charCounter(b)) {
        return b
    }
    return a
}));