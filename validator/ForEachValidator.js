
"use strict"



/**
 * Run validations on each element of the subject.
 *
 * This validator assume the subject is an array. You must use ArrayValidator before this validator.
 *
 * @param {Validator[]} validations
 */
module.exports = (validations) => (

    async (subject) => {

        // Ignore null and undefined.
        if (subject === null || subject === undefined) {
            return subject
        }

        return validateElements(subject, validations)
    }
)

const validateElements = (subject, validations) => (

    new Promise((resolve, reject) => {
        // Launch validation on each properties.
        let promises = []
        subject.forEach((element) => {

            validations.forEach((validation) => {

                promises.push(validation(element))
            })
        })

        Promise.all(promises)
            .then(() => {
                resolve(subject)
            })
            .catch(reject)
    })
)
