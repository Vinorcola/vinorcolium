
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate the subject as an array.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null ||subject === undefined) {
        resolve()
    } else if (typeof subject === "object" && subject instanceof Array) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
