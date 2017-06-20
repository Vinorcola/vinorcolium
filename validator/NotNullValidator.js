
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate a not-null (or not-undefined) value.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject !== null && subject !== undefined) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
