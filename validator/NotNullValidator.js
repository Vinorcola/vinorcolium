
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject is neither `null` nor `undefined`.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Check that subject is neither null nor undefined.
        if (subject !== null && subject !== undefined) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
