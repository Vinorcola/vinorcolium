
"use strict"



module.exports = class NotFoundError extends Error {
    constructor(message = "Not found.") {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = "NotFoundError"
        this.httpStatus = 404
    }
}
