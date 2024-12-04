const fs = require('fs');

let data = fs.readFileSync('./day4/data.txt').toString().split('\r\n');

const search = "XMAS"
const rowLength = data[0].length
const words = []

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < rowLength; j++) {
        // bounds checks unnecessary when plucking chars from strings,
        // since they'll just be undefined and discarded in the filter 
        words.push(data[i][j] + data[i][j + 1] + data[i][j + 2] + data[i][j + 3])

        if (data[i + 3]) {
            words.push(data[i][j] + data[i + 1][j] + data[i + 2][j] + data[i + 3][j]);
            words.push(data[i][j] + data[i + 1][j + 1] + data[i + 2][j + 2] + data[i + 3][j + 3]);
            words.push(data[i][j] + data[i + 1][j - 1] + data[i + 2][j - 2] + data[i + 3][j - 3]);
        }
    }
}

const answer = words.filter(word => word == search || word == search.split('').reverse().join('')).length

console.log(answer) // answer is 2401