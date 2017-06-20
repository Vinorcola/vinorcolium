
"use strict"



/**
 * Try to authenticate the user if an auth token is provided in the request headers.
 *
 * The user object will to attached to the request object as "userAccount" property.
 *
 * @param secret
 * @param authTokenHeaderName
 * @returns {function(*, *, *=)}
 */
module.exports = (secret, authTokenHeaderName = "x-auth-token") => {
    const authTokenModel = require("../model/AuthTokenModel")(secret)

    return (request, response, next) => {
        if (request.headers[authTokenHeaderName] !== undefined) {
            authTokenModel
                .decodeToken(request.headers[authTokenHeaderName])
                .catch(next)
                .then(userAccount => {
                    request.userAccount = userAccount
                    next()
                })
        } else {
            next()
        }
    }
}
