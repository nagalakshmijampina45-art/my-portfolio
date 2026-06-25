let numbers = [12, 34, 78, 45];

let max, secMax;
let min, secMin;

if (numbers[0] > numbers[1]) {
    max = numbers[0];
    secMax = numbers[1];
} else {
    max = numbers[1];
    secMax = numbers[0];
}

if (numbers[0] < numbers[1]) {
    min = numbers[0];
    secMin = numbers[1];
} else {
    min = numbers[1];
    secMin = numbers[0];
}

for (let i = 2; i < numbers.length; i++) {

    if (numbers[i] > max) {
        secMax = max;
        max = numbers[i];
    } else if (numbers[i] > secMax) {
        secMax = numbers[i];
    }

    if (numbers[i] < min) {
        secMin = min;
        min = numbers[i];
    } else if (numbers[i] < secMin) {
        secMin = numbers[i];
    }
}

console.log("Largest =", max);
console.log("Second Largest =", secMax);
console.log("Smallest =", min);
console.log("Second Smallest =", secMin);