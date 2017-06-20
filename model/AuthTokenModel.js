
"use strict"

const jwt = require("jsonwebtoken")

const InvalidAuthenticationError = require("../error/InvalidAuthenticationError")



module.exports = secret => ({
    generateToken: userAccount => Promise.resolve(
        jwt.sign({
            id: userAccount.id,
            authorizations: userAccount.authorizations,
        }, secret, {
            expiresIn: 10 * 60, // 10 minutes
        })
    ),

    decodeToken: token => new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (error, result) => {
                if (error) {
                    reject(new InvalidAuthenticationError("Invalid authentication token."))
                } else {
                    resolve({
                        id: result.id,
                        authorizations: result.authorizations,
                    })
                }
            })
        }
    ),
})
