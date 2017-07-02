
"use strict"



module.exports = class InvalidAuthenticationError extends Error {
    constructor(message) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "InvalidAuthenticationError"
        this.status = 401
    }
}
