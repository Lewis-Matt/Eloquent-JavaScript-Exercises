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

