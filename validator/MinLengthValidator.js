
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Check that the subject length is above the given threshold.
 *
 * This validator assume the subject has a `length` property. It is suggested to either use ArrayValidator or
 * StringValidator (or any other validator that will make sure the subject has a `length` property) before this
 * validator.
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

        // Check that the subject has a length and that length is above the threshold.
        if (subject.length && (
            strict ?
                subject.length > threshold :
                subject.length >= threshold
        )) {
            return subject
        }

        throw new InvalidInputError(message)
    }
)
