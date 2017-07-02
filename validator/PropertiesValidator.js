
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate the properties of an object.
 *
 * This validator assume an object is passed. Please use ObjectValidator before this validator.
 *
 * @param properties
 * @param missingPropertyMessage
 * @param allowAdditional
 * @param noAdditionalMessage
 */
module.exports = (properties, missingPropertyMessage, allowAdditional = true, noAdditionalMessage = "") => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else {
        let additionalProperty
        if (!allowAdditional && !Object.keys(subject).every(property => {
                if (!properties.hasOwnProperty(property)) {
                    additionalProperty = property
                    return false
                }

                return true
            })) {
            reject(new InvalidInputError(noAdditionalMessage.replace("%property%", additionalProperty)))
            return
        }

        let validations = []
        let missingProperty
        if (!Object.keys(properties).every(property => {
            if (!subject.hasOwnProperty(property)) {
                missingProperty = property

                return false
            }
            properties[property].forEach(validation => {
                validations.push(validation(subject[property]))
            })

            return true
        })) {
            reject(new InvalidInputError(missingPropertyMessage.replace("%property%", missingProperty)))
            return
        }

        Promise.all(validations)
            .then(resolve)
            .catch(reject)
    }
})
