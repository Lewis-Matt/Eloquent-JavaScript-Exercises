"use strict";
// Object mutability
// With objects, there is a difference between having two REFERENCES to the same object and having two different objects that contain the same properties:
let obj1 = {value: 10};
let obj2 = obj1;
let obj3 = {value: 10};

// obj1 and obj2 grasp the same object, they are said to have the same IDENTITY, which is why changing obj2 changes obj1 as well.
// obj2 is a SHALLOW copy of obj1
delete obj2.value;
console.log(obj1); // she gone

// obj3 is its own object, with the same key:value as obj1, it lives a separate life

// A DEEP copy can be achieved via
let obj4 = {value: 10};
let obj5 = JSON.parse(JSON.stringify(obj4));
console.log(obj5);
delete obj5.value;
console.log(obj4);


console.log('------------------THE SUM OF A RANGE-------------------------');
// THE SUM OF A RANGE
// Write a range function that takes two arguments, start and end, and returns an array containing all the numbers, inclusive.
// Bonus: modify range() to take an optional third argument that indicates the 'step' value used when building the array. If no argument is given, default to '1'
let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let range = function (start, end, step = 1) {
    let rangeArray = [];
    while (start <= end) {
        rangeArray.push(start);
        start += step;
    }
    return rangeArray;
}
console.log(`Range: ${range(1, 10, 2)}`);
// Write a sum function that takes an array of numbers and returns their sum

let sum = function (numArray) {
    let add = 0;
    for (let num of numArray) {
        add += num;
    }
    return add;
}
console.log(`Sum: ${sum(testArray)}`);

console.log(`Sum of Range: ${sum(range(1, 10, 2))}`);

// console.log(sum(range(1, 10)));
console.log('------------------REVERSING AN ARRAY-------------------------');
// REVERSING AN ARRAY
// Write reverseArray, that takes an array as argument and produces a new array that has the same elements in the inverse order.
let reverseArray = function (arr) {
    let reversedArray = [];
    for (let element of arr) {
        // I am not sure why, but using reversedArray.push(arr.pop()) would return a reversed array of half the length...
        reversedArray.unshift(element);
    }
    return reversedArray;
}
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
// Write reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.
// You have to be careful not to overwrite elements that you will later need. The trick is to swap the first and last elements, then the second and second-to-last, and so on. You can do this by looping over half the length of the array (use Math.floor to round down???you don???t need to touch the middle element in an array with an odd number of elements) and swapping the element at position i with the one at position array.length - 1 - i. You can use a local binding to briefly hold on to one of the elements, overwrite that one with its mirror image, and then put the value from the local binding in the place where the mirror image used to be.
// Full disclosure, this is the book solution as I couldn't figure it out on my own:
let reverseArrayInPlace = function (arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        let original = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = original;
    }
    return arr;
}
console.log(reverseArrayInPlace(testArray));
// Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one runs faster?

console.log('------------------A LIST-------------------------');
// A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.
// LIST USED AS REFERENCE AND FOR TESTING
let testList = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

// Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
// ATTEMPT 1
/*let arrayToList = function(array) {
    let list = {};
    array.forEach(element => {
        list.value = element;
        list.rest = list;
    })
    return list;
}
console.log(arrayToList([1, 2, 3]));*/
console.log('--------ARRAY TO LIST--------')
// ATTEMPT 2
let arrayToList = function (array) {
    // Base case
    let list = null;
    // Loops through each element of the array - need to reverse the array otherwise the list is in descending order
    // debug and step-in to see what is happening
    array.slice().reverse().forEach(element => {
        // The first iteration sets the value: 3, rest:null.
        // Loop goes to the second element (2) and sets the value: 2, rest: {object created in 1st iteration} etc.
        list = {value: element, rest: list};
    })
    return list;
}
console.log(arrayToList([1, 2, 3]))

console.log('--------LIST TO ARRAY--------')
// Also write a listToArray function that produces an array from a list.
let listToArray = function (list) {
    // Set array to equal the value property of the list; in this case 1 (as the second property name is 'rest')
    let array = [list.value];
    // Loops through the properties of the object
    for (const property in list) {
        // Continue looping though each 'rest' property (which is an object with the first property of 'value') until we hit null.
        while (list.rest !== null) {
            // Set the list to be the next node in the linked list
            list = list.rest;
            // Add the 'value' properties value of each node to our array
            array.push(list.value)
        }
    }
    return array;
}
console.log(listToArray(testList));

console.log('--------PREPEND--------')
// Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list.
let prepend = (element, list) => {
    return {element, rest: list}
}
console.log(prepend(4, testList));

console.log('--------NTH--------')
// Write nth, which takes a list and a number (index) and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.
// 1st Attempt
/*let nth = (list, number) => {
    for (const property in list) {
        while(list.rest !== null) {

            list = list.rest;

        }
    }
}*/
// 2nd Attempt - KEEP IT D.R.Y.!!!
let nth = function (list, number) {
    // NO IDEA WHY IT DOESN'T WORK WHEN SURROUND BY () : return listToArray((list)[array]) gives typeError...
    // NVM: listToArray(list) is the function call, and I am saying that I want the [index] of listToArray(list)'s return value (which is an array, obviously)
    return listToArray(list)[number];
}
console.log(nth(testList, 1));


// HAD TO USE BOOK SOLUTION ON THIS
// If you haven???t already, also write a recursive version of nth.
console.log('--------NTH RECURSIVE--------')
let nthR = (list, number) => {
    // If list is not null
    if (!list) {
        return undefined;
    } else if (number === 0) {
        return list.value;
    } else {
        // Run nth(list,number) with list.rest being the next node until we get to our base case number === 0
        return nthR(list.rest, number - 1);
    }
}
console.log(nthR(testList, 1));


console.log('------------------DEEP COMPARISON-------------------------');
// DEEP COMPARISON
// Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.
// To find out whether values should be compared directly (use the === operator for that) or have their properties compared, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".
// The Object.keys function will be useful when you need to go over the properties of objects to compare them.
let deepEqual = function (x, y) {
    // If x and y have the same value (or they are identical objects)
    if (x === y) {
        return true;
    }
    // Handle 'null' and if neither x nor y are not objects
    if (x == null || typeof x != 'object' || y == null || typeof y != 'object') {
        return false;
    }
    // Otherwise, both x and y must be objects, start deep comparison:
    // Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
    let xKeys = Object.keys(x);
    let yKeys = Object.keys(y);
    // Compare the length of both Keys arrays. If they are not the same, we stop the comparison:
    if (xKeys.length !== yKeys.length) {
        return false;
    }
    // Loop through the keys in xKeys (if there are nested objects)
    for (let key of xKeys) {
        // Check if each key also exists in yKeys OR recursively call deepEqual (handles nested objects). If either condition is false, return false.
        // The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
        if (!yKeys.includes(key) || !deepEqual(x[key], y[key])) {
            return false;
        }
    }
    // If you made it this far, x and y must be equal!
    return true;
}
let testObj = {here: {is: "an"}, object: 2};
let testObj2 = {here: {is: "an"}, object: 3};
console.log(deepEqual(testObj, testObj));
console.log(deepEqual(7, 7))
console.log(deepEqual(testObj, testObj2))