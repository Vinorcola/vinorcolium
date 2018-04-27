
"use strict"



class BadCredentialsError extends Error {

    constructor(message = "Bad credentials.") {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "BadCredentialsError"
        this.status = 400
    }
}

module.exports = BadCredentialsError
