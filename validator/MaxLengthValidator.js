
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate the maximum length of a string or an array.
 *
 * @param threshold
 * @param message
 */
module.exports = (threshold, message) => subject => new Promise((resolve, reject) => {
    if (subject.length && subject.length <= threshold) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
