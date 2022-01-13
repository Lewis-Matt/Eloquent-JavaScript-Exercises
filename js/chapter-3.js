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
