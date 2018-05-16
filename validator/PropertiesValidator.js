
"use strict"

const InvalidInputError = require("../error/InvalidInputError")



/**
 * Validate the properties of an object.
 *
 * This validator assume an object is passed. Please use ObjectValidator before this validator.
 *
 * @param {object}      properties
 * @param {string}      missingPropertyMessage    The substring "%property%" will be replaced by the concerned property's name.
 * @param {string|null} additionalPropertyMessage The substring "%property%" will be replaced by the concerned property's name. Ignore additional properties if message is `null`.
 */
module.exports = (properties, missingPropertyMessage, additionalPropertyMessage) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        // Check for extra property.
        if (additionalPropertyMessage !== null) {
            Object.keys(subject).forEach((property) => {
                if (!properties.hasOwnProperty(property)) {
                    throw new InvalidInputError(additionalPropertyMessage.replace("%property%", property))
                }
            })
        }

        let promises = []
        Object.entries(properties).forEach(([ property, propertyValidations ]) => {

            if (!subject.hasOwnProperty(property)) {
                throw new InvalidInputError(missingPropertyMessage.replace("%property%", property))
            }

            propertyValidations.forEach((validation) => {
                promises.push(
                    validation(subject[property])
                )
            })
        })

        return await Promise
            .all(promises)
            .then(() => (subject))
    }
)
