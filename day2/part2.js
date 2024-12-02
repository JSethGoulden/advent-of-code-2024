const fs = require('fs');

let data = fs.readFileSync('./day2/data.txt').toString().split('\r\n');

// split each line into an array of numbers
data = data.map(str => str.split(' ').map(num => +num))

let safeReports = 0

const reportIsSafe = (report) => {
    let isSafe = true
    let isIncreasing = report[0] - report[1] < 0

    // iterate over each level (except the last) and compare
    // the difference between it and the next level
    for (let i = 0; i < report.length; i++) {
        let difference = report[i] - report[i + 1]

        // if difference is the wrong direction (increasing when it should be decreaseing),
        // or two consecutive numbers are the same, the report is unsafe
        if (difference === 0) return false

        if (isIncreasing && difference > 0) return false

        if (!isIncreasing && difference < 0) return false

        // if delta is  > 3, the report is unsafe
        if (Math.abs(difference) > 3) return false
    }

    return true
}

data.forEach(report => {
    // keep track of the level that has been plucked, starting with 0
    // try to validate the report
    // if the report fails, try again with the next level plucked
    // break early once a success is found
    if (reportIsSafe(report)) return safeReports++

    let nextSplicedIndex = 0

    while (nextSplicedIndex < report.length) {
        // node doesn't have toSpliced :(
        // let newReport = report.toSpliced(nextSplicedIndex, 1)

        let newReport = [...report]
        newReport.splice(nextSplicedIndex, 1)


        if (reportIsSafe(newReport)) return safeReports++

        nextSplicedIndex++
    }
})

console.log(safeReports) // answer is 285