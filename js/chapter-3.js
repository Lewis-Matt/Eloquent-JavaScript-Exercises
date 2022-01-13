"use strict";
// Pg 53
// Write a program that prints two numbers: the number of cows and chickens on a farm, with the words Cows and Chickens after them and zeros padded before both numbers so that they are always 3 digits long.
// e.g.
// 007 Cows
// 011 Chickens
// This first example represents a messy function, that isn't reusable if the farmer adds pigs
function printFarmInventory(cows, chickens) {
    // Cows
    let cowString = String(cows);
    while (cowString.length < 3) {
        cowString = "0" + cowString;
    }
    console.log(`${cowString} Cows`);
    // Chickens
    let chickenString = String(chickens);
    while (chickenString.length < 3) {
        chickenString = "0" + chickenString;
    }
    console.log(`${chickenString} Chickens`);
}

printFarmInventory(7, 11);
// To add pigs, we'd have to add another block and copy and paste the code from 10-14 and change update it for pigs
// A better way:
console.log('-------------------------------------------');

function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventoryModified(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventoryModified(7, 11, 9);

// The above is about 25% less code, and it is exponentially less code the more types of animals you add.
// A function with a nice, obvious name of zeroPad makes it easier for someone who reads it to figure out what it does.
// zeroPad is useful in more situations than just this specific program (re-usability).
console.log('------------------EXERCISE 1-------------------------');

// Write your own version of Math.min(a,b)
function min(a, b) {
    if (a < b) {
        return a;
    } else if (a > b) {
        return b;
    }
    return 'a = b';
}

console.log(min(7, 5));
// BOOK SOLUTION
/*
function min(a, b) {
    if (a < b) return a;
    else return b;
}
// Doesn't cover a = b
*/
// Could have also used switch statement
console.log('------------------EXERCISE 2-------------------------');
// We can use % 2 === 0 to determine whether a number is even or odd, another way to define whether a whole number is even or odd is:
// Zero is even
// One is odd
// Any number N, its evenness is the same as N - 2
// Define a recursive function isEven that corresponds to this description. It takes in a single argument (whole number) and returns a boolean.
// Also test it on -1, how can you fix it?
function isEven(num) {
    let N = num;
    // When we enter -1, we get 'maximum call stack size exceeded', this checks for negative numbers and makes them positive
    if (N < 0) {
        N = N * -1;
    }
    if (N === 0) {
        return true;
    } else if (N === 1) {
        return false;
    } else {
        N = isEven(N - 2);
        return N;
    }
}

// BOOK SOLUTION
/*
function isEven(n) {
  if (n == 0) return true;
  else if (n == 1) return false;
  else if (n < 0) return isEven(-n);
  else return isEven(n - 2);
}
*/
console.log(isEven(-6));
console.log('------------------EXERCISE 3-------------------------');
// You can get the Nth char from a string by accessing it's index: string[N].
// The last character can be accessed via string.length-1 (since we start at 0). Or: str.slice(-1); Or: str.charAt(str.length - 1); Or: str[str.length - 1];
// Write a function called countBs that takes a string as its argument, and returns a number that indicates how many uppercase 'B' chars there are in the string.

function countBs(str) {
    let countB = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'B') {
            countB++;
        }
    }
    return countB;
}

console.log(countBs('ButtbuttButt'));

// Next write a function called countChar that behaves like countBs, except it takes a second argument  that indicates the char that is to be counted (rather than just the B's).
function countChars(str, char) {
    let countChar = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            countChar++;
        }
    }
    return countChar;
}

console.log(countChars('Orange is my favorite color', 'o'));

// Rewrite countBs to make use of this new function.
function countBs2(str) {
    return countChars(str, 'B');
}

console.log(countBs2('ButtbuttButt'));
