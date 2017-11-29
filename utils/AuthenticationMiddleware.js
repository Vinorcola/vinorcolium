
"use strict"

const AuthTokenModel = require("../model/AuthTokenModel")



/**
 * Try to authenticate the user if an auth token is provided in the request headers.
 *
 * The user object will to attached to the request object as "userAccount" property.
 *
 * @param secret              {string}
 * @param authTokenHeaderName {string|null}
 * @returns {function(*, *, *=)}
 */
module.exports = (secret, authTokenHeaderName = "x-auth-token") => {
    const authTokenModel = AuthTokenModel(secret)

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
