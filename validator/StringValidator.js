
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject is a string.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is a string.
        if (typeof subject === "string") {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
