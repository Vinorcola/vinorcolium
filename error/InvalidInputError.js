
"use strict"



module.exports = class InvalidInputError extends Error {
    constructor(message) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "InvalidInputError"
        this.httpStatus = 422
    }
}
