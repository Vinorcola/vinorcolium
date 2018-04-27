
"use strict"



class NotFoundError extends Error {

    constructor(message = "Not found.") {

        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "NotFoundError"
        this.status = 404
    }
}

module.exports = NotFoundError
