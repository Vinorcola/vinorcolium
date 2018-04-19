
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate a string.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else if (typeof subject === "string") {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
