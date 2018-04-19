
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that a number value is equal or bellow the given threshold.
 *
 * @param threshold
 * @param message
 */
module.exports = (threshold, message) => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else if (subject <= threshold) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
