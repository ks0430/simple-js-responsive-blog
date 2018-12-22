// Lesson4: Javascript

// var variable = "My variable -----";

// variable = "new variable";

// console.log(variable);

// hoisting
console.log(hello);
var hello = "Hello";
console.log(hello);

// name rule
// Four type
// Use camel Case
// not more than three word

var UPPER_CASE = "UPPER";
var camelCase = "Camel";
var PascalCase = "";
var under_score = "";

// undefined
// Attension: named null as initial
var undef = null;
console.log(undef);

// Number
// 2.14 10 Infinitive -Infinitive NAN
var infinitiveNumber = -Infinity;
infinitiveNumber = Infinity;

console.log(Number("hhh"));
// Attension: online vscode transfer null (undefined to null)

console.log(typeof 123);

// condition operator
console.log(1 == "1"); // will transfer
console.log(1 === "1");

// Attension
// Javascript operator:
// 1. transfer to number: null to number equals 0, undefined to NaN
// 1 + null = 1
// 1 + undefined = NaN
// 0.1 + 0.2 = 0.3000000000004  binary transfer to decimal
console.log(+(0.1 + 0.2).toFixed(2)); // to fixed is string

// angular  - ts
// vue & react - support

var array = [1, 2, , 3]; // The third one is undefined
array = [];
array[10] = 10;
console.log(array);

array = [];
array[4] = [];
array[4][4] = "2d";
console.log(array);

// False
// 0 is false
// ""
// Null
// Undefined

// continue & break
// break current loop

function add(a, b) {
  console.log(2 + 3);
  return; // return is undefined
}

var answer = add(2, 2);
console.log(answer);
