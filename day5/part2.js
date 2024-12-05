const fs = require('fs');

let data = fs.readFileSync('./day5/data.txt').toString().split('\r\n');

const rules = data.slice(0, data.indexOf('')).map(rule => rule.split('|'))
const updates = data.slice(data.indexOf('') + 1)
const invalidUpdates = []
const correctedUpdates = []
const ruleIsRelevant = (rule, update) => update.indexOf(rule[0]) !== -1 && update.indexOf(rule[1]) !== -1
const getMiddleNumber = update => {
    update = update.split(',')
    return +update[Math.floor(update.length / 2)]
}

updates.forEach(update => {
    const relevantRules = rules.filter(rule => ruleIsRelevant(rule, update))

    for (const rule of relevantRules) {
        if (update.indexOf(rule[0]) > update.indexOf(rule[1])) return invalidUpdates.push(update)
    }
})

invalidUpdates.forEach(update => {
    const relevantRules = rules.filter(rule => ruleIsRelevant(rule, update))
    update = update.split(',')
    let changed = true
    while (changed) {
        changed = false
        for (const rule of relevantRules) {
            if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
                [update[update.indexOf(rule[0])], update[update.indexOf(rule[1])]] = [update[update.indexOf(rule[1])], update[update.indexOf(rule[0])]]
                changed = true
            }
        }
    }

    correctedUpdates.push(update.join(','))
})

const answer = correctedUpdates.reduce((acc, cur) => acc + getMiddleNumber(cur), 0)

console.log(answer) // answer is 5017