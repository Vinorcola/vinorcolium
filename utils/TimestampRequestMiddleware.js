
"use strict"



module.exports = (request, response, next) => {
    request.date = new Date()
    next()
}
