/*
Correlation is a measure of dependence between statistical variables. A statistical variable is not quite the same as a programming variable. In statistics you typically have a set of measurements, and each variable is measured for every measurement. Correlation between variables is usually expressed as a value that ranges from -1 to 1. Zero correlation means the variables are not related. A correlation of one indicates that the two are perfectly related—if you know one, you also know the other. Negative one also means that the variables are perfectly related but that they are opposites—when one is true, the other is false.

To compute the measure of correlation between two Boolean variables, we can use the phi coefficient (ϕ).
*/
/*
ϕ = (n11n00 − n10n01) /
    √(n1•n0•n•1n•0)
Note: n10 indicates the number of measurements where the first variable is true (1) and the second is false (0).
The • does not mean multiply, it means we are not looking at the variable in that position is:  n1• refers to the sum of all measurements where the first variable is true,
n•0 is the sum of all measurements where the second variable is false... etc.
We can represent a two-by-two table in JavaScript with a four-element array ([76, 9, 4, 1]) where the indices represent two bit binary numbers, where the leftmost digit refers to the squirrel variable, and the rightmost refers to the event variable. For example, the binary number 10 refers to the case where he did turn into a squirrel, but the event didn't occur. Since 10 is 2 in decimal, we put it in index 2 of the array.
*/


var journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}
// Direct programming translation of the correlation function
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
// To extract a two-by-two table for a specific event from the journal, we must loop over all the entries and tally how many times the event occurs in relation to squirrel transformations.
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  // The body of the loop in tableFor figures out which box in the table each journal entry falls into by checking whether the entry contains the specific event it’s interested in and whether the event happens alongside a squirrel incident. The loop then adds one to the correct box in the table.
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    // Arrays have an includes method that checks whether a given value exists in the array. The function uses that to determine whether the event name it is interested in is part of the event list for a given day.
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}
// Find every type of event in the journal, and if they are not already in the events array add them to it.
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

// Imports JOURNAL array
const JOURNAL = require('./journal.js');

for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
console.log('---------------------------------------------------');
// Most correlations seem to lie close to zero. Eating carrots, bread, or pudding apparently does not trigger squirrel-lycanthropy. It does seem to occur somewhat more often on weekends. Let’s filter the results to show only correlations greater than 0.1 or less than -0.1.
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
console.log('---------------------------------------------------');

// Aha! There are two factors with a correlation that’s clearly stronger than the others. Eating peanuts has a strong positive effect on the chance of turning into a squirrel, whereas brushing his teeth has a significant negative effect.
// Interesting. Let’s try something.
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
      !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
console.log('---------------------------------------------------');
// That’s a strong result. The phenomenon occurs precisely when Jacques eats peanuts and fails to brush his teeth. If only he weren’t such a slob about dental hygiene, he’d have never even noticed his affliction.