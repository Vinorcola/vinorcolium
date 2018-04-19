
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let integerRegex = /^[0-9]+$/

/**
 * Validate an integer value, may it be stored as a number or as a string.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else if (typeof subject === "number" && Number.isInteger(subject)) {
        resolve()
    } else if (typeof subject === "string" && subject.match(integerRegex)) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
