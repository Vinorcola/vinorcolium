
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject is above the given threshold.
 *
 * This validator assume the subject is a number. You must use either NumberValidator or IntegerValidator before this validator.
 *
 * @param {number}  threshold
 * @param {string}  message
 * @param {boolean} strict
 */
module.exports = (threshold, message, strict = false) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check that the subject is above the threshold.
        if (strict ?
                subject > threshold :
                subject >= threshold
        ) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
