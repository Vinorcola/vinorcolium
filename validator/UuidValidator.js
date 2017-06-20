
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let uuidRegex = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/

/**
 * Validate an uuid value.
 *
 * @param message
 */
module.exports = message => subject => new Promise((resolve, reject) => {
    if (subject === null ||subject === undefined) {
        resolve()
    } else if (subject.match(uuidRegex)) {
        resolve()
    } else {
        reject(new InvalidInputError(message))
    }
})
