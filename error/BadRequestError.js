
"use strict"



class BadRequestError extends Error {

    constructor(message = "Bad request.") {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "BadRequestError"
        this.status = 400
    }
}

module.exports = BadRequestError
