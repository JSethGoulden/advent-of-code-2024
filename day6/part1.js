const fs = require('fs');

let map = fs.readFileSync('./day6/data.txt').toString().split('\r\n');

// in-place replacement of character(s) - https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-specific-index-in-javascript
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const mapWidth = map[0].length
let curSymbol, curX, curY
// used to rotate: moves[(moves.indexOf('symbol') + 1) % moves.length]
const moves = ['^', '>', 'V', '<']
const isInbounds = (x, y) => (y > -1 && y < map.length && x > -1 && x < mapWidth)
const findStartPosition = () => {
    for (let i = 0; i < map.length; i++) {
        if (map[i].indexOf('^') > -1) {
            curX = map[i].indexOf('^')
            curY = i
            break;
        }
    }
}

findStartPosition()
let hasMoved = true
curSymbol = '^'

while (hasMoved) {
    let destX, destY
    hasMoved = false

    switch (curSymbol) {
        case '^':
            destX = curX
            destY = curY - 1
            break
        case 'V':
            destX = curX
            destY = curY + 1
            break
        case '<':
            destX = curX - 1
            destY = curY
            break
        case '>':
            destX = curX + 1
            destY = curY
            break
        default:
            console.log('uh oh')
    }

    if (isInbounds(destX, destY)) {
        hasMoved = true
        if (map[destY][destX] == '#') {
            curSymbol = moves[(moves.indexOf(curSymbol) + 1) % moves.length]
        }
        else {
            map[curY] = map[curY].replaceAt(curX, 'X')
            map[destY] = map[destY].replaceAt(destX, curSymbol)
            // map[curY][curX] = 'X'
            // map[destY][destX] = curSymbol

            curX = destX
            curY = destY
        }
    }
}
const countChar = (str, char) => str.split('').filter(x => x === char).length

// accumulator starts at 1 to account for the guard's last standing position
let answer = map.reduce((acc, cur) => acc + countChar(cur, "X"), 1)

console.log(answer) // answer is 4819