
"use strict"



class AccessDeniedError extends Error {

    constructor(message = "Access denied.", missingAuthorization = null) {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "AccessDeniedError"
        this.status = 403
        this.missingAuthorization = missingAuthorization
    }
}

module.exports = AccessDeniedError
