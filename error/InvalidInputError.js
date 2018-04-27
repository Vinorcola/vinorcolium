
"use strict"



class InvalidInputError extends Error {

    constructor(message = "Invalid input.") {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "InvalidInputError"
        this.status = 422
    }
}

module.exports = InvalidInputError
