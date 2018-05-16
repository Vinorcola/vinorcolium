
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let numberRegex = /^[0-9]+(\.[0-9]+)?$/

/**
 * Check that the subject is a number.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is a number.
        if (typeof subject === "number") {
            return subject
        }

        // Check that subject is a string containing a number.
        if (typeof subject === "string" && subject.match(numberRegex)) {
            return parseFloat(subject)
        }

        throw new InvalidInputError(message)
    }
)
