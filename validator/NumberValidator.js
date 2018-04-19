
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let numberRegex = /^[0-9]+(\.[0-9]+)?$/

/**
 * Validate a number value, may it be stored as a number or as a string.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else if (typeof subject === "number") {
        resolve()
    } else if (typeof subject === "string" && subject.match(numberRegex)) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
