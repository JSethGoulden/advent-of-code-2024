const fs = require('fs');

let data = fs.readFileSync('./day4/data.txt').toString().split('\r\n');

const rowLength = data[0].length
const words = []
let count = 0

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < rowLength; j++) {
        if (data[i][j] !== "A") continue

        // bounds check
        if (!data[i - 1] || !data[i + 1]) continue

        const top = data[i - 1][j - 1] + data[i - 1][j + 1]
        const bottom = data[i + 1][j - 1] + data[i + 1][j + 1]

        if ((top == "MM" && bottom == "SS")
            || (top == "SS" && bottom == "MM")
            || (top == 'SM' && bottom == "SM")
            || (top == "MS" && bottom == "MS")
        ) count++
    }
}


console.log(count) // answer is 1822