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

// Second call to reduce finds the largest script by repeatedly comparing two scripts and returning the large one
console.log(SCRIPTS.reduce((a, b) => {
    if (charCounter(a) < charCounter(b)) {
        return b
    }
    return a
}));

// How the above would be written without higher-order functions
let biggest = null;
for (let script of SCRIPTS) {
    if (biggest == null ||
        charCounter(biggest) < charCounter(script)) {
        biggest = script;
    }
}
console.log(biggest);


console.log('--------------------characterScript----------------------')

// Loops over characters, tells you which script they belong to
function characterScript(charCode) {
    for (let script of SCRIPTS) {
        // some() is another higher-order function. It takes a test function and tells whether that function returns true for any element in the array
        if (script.ranges.some(([from, to]) => {
            return charCode >= from && charCode < to;
        })) {
            return script;
        }
    }
    return null;
}

console.log(characterScript(121))

console.log('--------------------countBy----------------------')

// Count the chars that belong to each script
// Loops over a collection, computes a group name for a give element
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item)
        {
            // findIndex() finds the first value for which the given function returns true. Returns -1 when no element is found
            let known = counts.findIndex(c => c.name == name);
            if (known == -1) {
                counts.push({name, count: 1});
            } else {
                counts[known].count++;
            }
        }
    }
    // Returns an array of objects, each of which names a group and tells you the number of elements that were found in that group
    return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));

// Which scripts are used in a piece of text
console.log('--------------------textScripts----------------------')

function textScripts(text) {
    // The function first counts the characters by name, using characterScript to assign them a name and falling back to the string "none" for characters that aren’t part of any script.
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        // I hate the ternary operator: return script ? script.name: "none";
        if (script) {
            return script.name;
        }
        return "none";
        // The filter call drops the entry for "none" from the resulting array since we aren’t interested in those characters
    }).filter(({name}) => name != "none");

    // To be able to compute percentages, we first need the total number of characters that belong to a script, which we can compute with reduce.
    let total = scripts.reduce((n, {count}) => n + count, 0);
    // If no such characters are found, the function returns a specific string.
    if (total == 0) return "No scripts found";

    // Otherwise, it transforms the counting entries into readable strings with map and then combines them with join.
    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
}

console.log(textScripts('Ω≈çåß∂'));

console.log('--------------EXERCISE: FLATTENING---------------')
// TODO: Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.
// → [1, 2, 3, 4, 5, 6]
let arrays = [[1, 2, 3], [4, 5], [6]];

// The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
function flatten(arr) {
    return arr.reduce((finalArr, current) => {
        return finalArr.concat(current)
    })
}

console.log(flatten(arrays));

console.log('--------------EXERCISE: YOUR OWN LOOP---------------')

// TODO: Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.
function loop(value, testFN, updateFN, bodyFN) {
    for (let iterator = value; testFN(iterator); iterator = updateFN(iterator)) {
        bodyFN(iterator);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// // → 3
// // → 2
// // → 1

console.log('--------------EXERCISE: EVERYTHING---------------')
// Analogous to the some method, arrays also have an every method. This one returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.
// Like the && operator, the every method can stop evaluating further elements as soon as it has found one that doesn’t match. So the loop-based version can jump out of the loop—with break or return—as soon as it runs into an element for which the predicate function returns false. If the loop runs to its end without finding such an element, we know that all elements matched and we should return true.
//
// To build every on top of some, we can apply De Morgan’s laws, which state that a && b equals !(!a || !b). This can be generalized to arrays, where all elements in the array match if there is no element in the array that does not match.
// TODO: Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.
function every(array, test) {
    // Your code here.
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

console.log('--------------EXERCISE: DOMINANT WRITING DIRECTION---------------')
// TODO: Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
// The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here.
// our solution might look a lot like the first half of the textScripts example. You again have to count characters by a criterion based on characterScript and then filter out the part of the result that refers to uninteresting (script-less) characters.
//
// Finding the direction with the highest character count can be done with reduce. If it’s not clear how, refer to the example earlier in the chapter, where reduce was used to find the script with the most characters.

function dominantDirection(text) {
    // Your code here.
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl