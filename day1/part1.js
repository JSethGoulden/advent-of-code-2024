const fs = require('fs');

let data = fs.readFileSync('./day1/data.txt').toString().split('\r\n');

const left = []
const right = []

// convert the data to arrays of number pairs
data = data.map(distances => distances.split('   ').map(num => +num))

// split up the left and right numbers so that they can be sorted and compared
data.forEach(pair => {
    left.push(pair[0])
    right.push(pair[1])
})

const sortFn = (a, b) => a - b
left.sort(sortFn)
right.sort(sortFn)

// the sum of the "distance" between each sorted
// number pair is the answer we're looking for
let answer = 0

left.forEach((_, index) => {
    answer += Math.abs(left[index] - right[index])
})

console.log(answer) // answer is: 2769675