
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate the minimum length of a string or an array.
 *
 * @param threshold
 * @param message
 */
module.exports = (threshold, message) => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else if (subject.length && subject.length >= threshold) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
