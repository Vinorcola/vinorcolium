
"use strict"



module.exports = class BadCredentialsError extends Error {
    constructor() {
        super("Bad credentials.")
        Error.captureStackTrace(this, this.constructor)
        this.name = "BadCredentialsError"
        this.httpStatus = 400
    }
}
