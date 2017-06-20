
"use strict"



module.exports = class AccessDeniedError extends Error {
    constructor(message, missingAuthorization) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "AccessDeniedError"
        this.httpStatus = 403
        this.missingAuthorization = missingAuthorization
    }
}
