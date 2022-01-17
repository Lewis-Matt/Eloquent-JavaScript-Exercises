"use strict";
// Object mutability
// With objects, there is a difference between having two REFERENCES to the same object and having two different objects that contain the same properties:
let obj1 = {value: 10};
let obj2 = obj1;
let obj3 = {value: 10};

// obj1 and obj2 grasp the same object, they are said to have the same IDENTITY, which is why changing obj2 changes obj1 as well.
// obj2 is a SHALLOW copy of obj1
delete obj2.value;
console.log(obj1);

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
// Write a sum function that takes an array of numbers and returns their sum
// Bonus: modify range() to take an optional third argument that indicates the 'step' value used when building the array. If no argument is given, default to '1'


// console.log(sum(range(1, 10)));
console.log('------------------REVERSING AN ARRAY-------------------------');
// REVERSING AN ARRAY
// Write reverseArray, that takes an array as argument and produces a new array that has the same elements in the inverse order.
// Write reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.
// Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one runs faster?

console.log('------------------A LIST-------------------------');
// A LIST
// Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
// Also write a listToArray function that produces an array from a list.
// Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.
// If you haven’t already, also write a recursive version of nth.


console.log('------------------DEEP COMPARISON-------------------------');
// DEEP COMPARISON
// Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.
// To find out whether values should be compared directly (use the === operator for that) or have their properties compared, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".
// The Object.keys function will be useful when you need to go over the properties of objects to compare them.