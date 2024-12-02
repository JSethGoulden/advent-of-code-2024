const fs = require('fs');

let data = fs.readFileSync('./day2/data.txt').toString().split('\r\n');

// split each line into an array of numbers
data = data.map(str => str.split(' ').map(num => +num))

let safeReports = 0

data.forEach(report => {
    let isSafe = true
    let isIncreasing = report[0] - report[1] < 0

    // iterate over each level (except the last) and compare
    // the difference between it and the next level
    for (let i = 0; i < report.length; i++) {
        let difference = report[i] - report[i + 1]

        // if difference is the wrong direction (increasing when it should be decreaseing),
        // or two consecutive numbers are the same, the report is unsafe
        if (difference === 0) {
            isSafe = false
            break
        }

        if (isIncreasing && difference > 0) {
            isSafe = false
            break
        }

        if (!isIncreasing && difference < 0) {
            isSafe = false
            break
        }

        // if delta is  > 3, the report is unsafe
        if (Math.abs(difference) > 3) {
            isSafe = false
            break
        }
    }

    if (isSafe) safeReports++
})

console.log(safeReports) // answer is 213