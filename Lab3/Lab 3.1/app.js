//* bài 1

let multiply = (num1, num2) => num1 * num2;

console.log("Kết quả của hàm multiply:", multiply(3, 4));

let toCelsius = (fah) => (5 / 9) * (fah - 32);

console.log("Kết quả của hàm toCelsius:", toCelsius(5));

let padZeros = (num, totalLen) => {
    const numStr = num.toString();
    const numZeros = totalLen - numStr.length;

    for (let index = 0; index < numZeros; index++) {
        numStr = "0" + numStr;
    }

    return numStr;
}

console.log("Kết quả của hàm padZeros:", padZeros("hello"));

let power = (base, exponent) => {
    const result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }

    return result;
}

console.log("Kết quả của hàm power:", power(2)); // Example: 2^3


let greet = (who) => {
    console.log("Hello " + who);
}

greet("Lily");

// *Bài 2

const arr = [1, 2, 3, 4, 5, 6, 7];

const sumArr = (element) => {
    let sum = 0;

    for (let index = 0; index < arr.length; index++) {
        sum += element[index]

    }

    return sum;
}

console.log("Kết quả của hàm sumArr:", sumArr(arr));

// Bài 3
"use strict";

const entity = function (name, delay) {
    this.name = name;
    this.delay = delay;
};

entity.prototype.greet = function () {
    setTimeout(() => {
        console.log("Xin chào, tôi tên là ", this.name);
    }, this.delay);
};

const java = new entity("Java", 500);
const cpp = new entity("C++", 5000);

java.greet();
cpp.greet();
