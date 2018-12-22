// Test 1:Multiple of 4 and not mutiple of 5

let result = [];

function fourMultiple() {
  let arr = [];
  for (let i = 0; i <= 100; i++) {
    if (i % 4 !== 0) continue;
    if (i % 5 === 0) continue;
    arr.push(i);
    if (arr.length === 10) return arr;
  }
}

result = fourMultiple();
console.log(result);

// Test 2:

let arr = [1, 2, 4, 6, 7, 8, 10, 14, 15];
let target = 14;

function twoPlusFor(arr, target) {
  let output = [];
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // console.log("i", arr[i], "j", arr[j]);
      if (arr[i] + arr[j] === target) output.push([i, j]);
    }
  }
  return output;
}

arr[13] = 0; // store number 1 's index
arr[12] = 1;
arr[10] = 2;

result = twoPlusFor(arr, target);
console.log(result);

// push() pop() unshift() shift() slice() splice()

// Object  not by order
// Array by order
// array extends from object
//

var a = {
  length: 0,
  splice: function() {}
};

// array like object

// async & sync

// green html wait for js download run
// Defer: translation html async js ,
// async: translation download run
