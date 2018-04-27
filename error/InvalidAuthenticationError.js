
"use strict"



class InvalidAuthenticationError extends Error {

    constructor(message = "Invalid authentication.") {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "InvalidAuthenticationError"
        this.status = 401
    }
}

module.exports = InvalidAuthenticationError
