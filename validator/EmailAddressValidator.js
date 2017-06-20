
"use strict"

const validator = require("validator")

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate an e-mail address.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null ||subject === undefined) {
        resolve()
    } else if (subject !== "" && validator.isEmail(subject)) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
