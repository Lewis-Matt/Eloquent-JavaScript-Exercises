"use strict";
// Write a loop that makes seven calls to console.log to output the following:
/*
#
##
###
####
#####
######
#######
*/
console.log('--------Exercise 1--------');
for (let row = '#'; row.length <= 7; row += '#') {
    console.log(row)
}

// Print all numbers from 1 to 100. For numbers divisible by 3 print 'fizz', for numbers divisible by 5 (and not 3) 'print buzz.'
// For numbers divisible by 3 & 5, print 'fizzbuzz'

console.log('--------Exercise 2--------');
// Loop through 1 - 100
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log('fizzbuzz');
    } else if (i % 3 === 0) {
        console.log('fizz');
    } else if (i % 5 === 0) {
        console.log('buzz');
    } else {
        console.log(i);
    }
}

// Book Solution
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 === 0) output += "Fizz";
    if (n % 5 === 0) output += "Buzz";
    console.log(output || n);
}


console.log('--------Exercise 3--------');
// Create a string that represents a 8x8 grid, using new line characters to separate lines. At each position of the grid there is either a space or a #.
// The characters should form a chessboard:
/*
 # # # #
# # # #
 # # # #
.etc
*/

// I tried using console logs inside the if statements, but it would just print one character on each row. It wouldn't update for the entire board, so the best option is to create a variable that holds, and updates, the entire string that is created by the loops.
let size = 8;
let chessboard = '';
// Rows
for (let i = 0; i < size; i++) {
    // Columns
    for (let j = 0; j < size; j++) {
        // Prints ' ' on every even column, and '#' on every odd column
        if ((i + j) % 2 === 0) {
            chessboard += ' ';
        } else {
            chessboard += '#';
        }
    }
    chessboard += '\n';
}
console.log(chessboard);
