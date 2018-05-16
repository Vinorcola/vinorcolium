
"use strict"

const validator = require("validator")

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject is an e-mail address.
 *
 * @param {string} message
 */
module.exports = (message) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that subject is a non-empty string and pass email address validation.
        if (typeof subject === "string" && subject !== "" && validator.isEmail(subject)) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
