
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



let uuidRegex = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/

/**
 * Check that the subject is a uuid.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is a uuid.
        if (typeof subject === "string" && subject.match(uuidRegex)) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
