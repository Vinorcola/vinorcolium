
"use strict"



let counter = 0

module.exports = logger => (request, response, next) => {
    request.logger = logger.child({
        request: request.date ? request.date : ++counter,
    })
    request.logger.debug({
        remoteAddress: request.connection.remoteAddress,
        remotePort: request.connection.remotePort,
        method: request.method,
        url: request.originalUrl,
    })
    next()
}
