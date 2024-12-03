const fs = require('fs')

let data = fs.readFileSync('./day3/data.txt').toString()

// captures "mul(" , then 1-3 digits, then ",", then 1-3 digits, then ")"
const regex = /mul\(\d{1,3},\d{1,3}\)/g

const operations = data.match(regex)

let sum = 0

operations.forEach(operation => {
    // extracts digits from a string
    const factors = operation.match(/\d+/g)
    sum += +factors[0] * +factors[1]
})

console.log(sum) // answer is 175615763