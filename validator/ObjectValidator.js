
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject is an object.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is an object.
        if (typeof subject === "object" && !(subject instanceof Array)) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
