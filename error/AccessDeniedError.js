
"use strict"



module.exports = class AccessDeniedError extends Error {
    constructor(message, missingAuthorization) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "AccessDeniedError"
        this.status = 403
        this.missingAuthorization = missingAuthorization
    }
}
