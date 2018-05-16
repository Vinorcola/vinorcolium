
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(?::[0-9]{2})?(?:\.[0-9]{3}Z)?$/

/**
 * Check that the subject is a date with time.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is a Date.
        if (subject instanceof Date) {
            return subject
        }

        // Check that subject is a string containing a date.
        if (typeof subject === "string" && subject.match(dateRegex)) {
            return new Date(subject)
        }

        throw new InvalidInputError(message)
    }
)
