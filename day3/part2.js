const fs = require('fs')

let data = fs.readFileSync('./day3/data.txt').toString()


// captures "mul(" , then 1-3 digits, then ",", then 1-3 digits, then ")"
const regex = /mul\(\d{1,3},\d{1,3}\)/g
let sum = 0
let filteredMemory = ""
let donts = data.split("don't()")

// the memory starts in the do() state
filteredMemory += donts[0]
donts.shift()

donts.forEach(str => {
    // skip segments that don't have a do()
    // (such as consecutive don't()s, or end of array
    if (!str.includes("do()")) return;

    let instructions = str.split("do()")

    // discard the instructions between the don't() and first do()
    instructions.shift()

    filteredMemory += instructions.join('')
})

const operations = filteredMemory.match(regex)

operations.forEach(operation => {
    // extracts digits from a string
    const factors = operation.match(/\d+/g)
    sum += +factors[0] * +factors[1]
})

console.log(sum)