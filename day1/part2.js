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

// we're going to be counting the occurrences of numbers in the right list
// a whole lot, so it'll be helpful to cache the results as we go along
const occurencesCache = []
const similarityScores = []
// right.forEach(num => {
//     if (cache[num]) cache[num]++
//     else cache[num] = 1
// })

left.forEach(leftNum => {
    // first check the cache to see if we've
    // emcountered this number already
    if (occurencesCache[leftNum]) {
        similarityScores.push(leftNum * occurencesCache[num])
        return
    }

    let occurrences = 0

    right.forEach(rightNum => {
        if (leftNum === rightNum) occurrences++
    })

    occurencesCache[leftNum] = occurrences

    similarityScores.push(leftNum * occurrences)
})

// finally, sum the similarity scores
console.log(similarityScores.reduce((acc, cur) => acc + cur, 0)) // answer is 24643097