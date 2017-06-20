
"use strict"

const bodyParser = require("body-parser")
const express = require("express")

const AccessDeniedError = require("./error/AccessDeniedError")
const NotFoundError = require("./error/NotFoundError")
const authenticationMiddleware = require("./utils/AuthenticationMiddleware")
const mountController = require("./utils/ControllerMounter")



module.exports = {

    /**
     * Create a vinorcolium app.
     *
     * @param options {
     *     authTokenHeaderName: string [OPTIONAL],
     *     controllerPath: string,
     *     logger: Logger instance only used in development mode [OPTIONAL]
     *     secret: string,
     * }
     */
    createApp(options) {

        // Create express app.
        let app = express()

        // Body parser middleware.
        app.use(bodyParser.json())

        // Authentication middleware.
        app.use(authenticationMiddleware(options.secret, options.authTokenHeaderName))

        // Mount controllers.
        mountController(app, options.controllerPath, options.logger)

        // Catch non-handling request and create a NotFoundError.
        app.use((request, response, next) => {
            next(new NotFoundError())
        })

        // Error handler.
        app.use((error, request, response, next) => {
            let responseContent = {
                ok: false,
                error: {
                    code: error.code,
                    message: error.message,
                },
            }

            // Add details to response in development mode.
            if (process.env.NODE_ENV === "development") {
                if (error instanceof AccessDeniedError) {
                    responseContent.error.missingAuthorization = error.missingAuthorization
                }
                responseContent.error.stack = error.stack
            }

            response.status(error.httpStatus || 500)
            response.json(responseContent)
        })

        return app
    },
}
