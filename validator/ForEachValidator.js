
"use strict"



/**
 * Validate each element of an array.
 *
 * This validator assume an array is passed. Please use ArrayValidator before this validator.
 *
 * @param properties
 */
module.exports = properties => subject => new Promise((resolve, reject) => {
    if (subject === null || subject === undefined) {
        resolve()
    } else {
        let validations = []
        subject.forEach(element => {
            Object.keys(properties).forEach(property => {
                properties[property].forEach(validation => {
                    validations.push(validation(element))
                })
            })
        })

        Promise.all(validations)
            .then(resolve)
            .catch(reject)
    }
})
