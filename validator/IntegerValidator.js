
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let integerRegex = /^[0-9]+$/

/**
 * Check that the subject is an integer.
 *
 * @param {string} message
 * @param {number} parseBase Base used when parsing. Default to 10 (decimal).
 */
module.exports = (message, parseBase = 10) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is an integer.
        if (typeof subject === "number" && Number.isInteger(subject)) {
            return subject
        }

        // Check that subject is a string containing an integer.
        if (typeof subject === "string" && subject.match(integerRegex)) {
            return parseInt(subject, parseBase)
        }

        throw new InvalidInputError(message)
    }
)
