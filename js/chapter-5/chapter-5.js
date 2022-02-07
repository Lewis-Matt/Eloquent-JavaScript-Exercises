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

