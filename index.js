
"use strict"

const bodyParser = require("body-parser")
const express = require("express")

const AccessDeniedError = require("./error/AccessDeniedError")
const NotFoundError = require("./error/NotFoundError")
const authenticationMiddleware = require("./utils/AuthenticationMiddleware")
const mountController = require("./utils/ControllerMounter")
const requestLoggerMiddleware = require("./utils/RequestLoggerMiddleware")
const timestampRequestMiddleware = require("./utils/TimestampRequestMiddleware")



module.exports = {

    /**
     * Create a Vinorcolium app.
     *
     * @param options                     {object}
     * @param options.authTokenHeaderName {string|null} The HTTP header's name for authenticating the user.
     * @param options.controllerPath      {string}      The path to the controller's directory.
     * @param options.logger              {object|null} Logger instance only used in development mode.
     * @param options.noTimestamp         {bool|null}   Disable request timestamp if set to true.
     * @param options.secret              {string}      The secret used for authentication encryption.
     */
    createApp(options) {

        // Create express app.
        let app = express()

        // Timestamp request.
        if (options.noTimestamp !== true) {
            app.use(timestampRequestMiddleware)
        }

        // Attach logger to request.
        if (options.logger) {
            app.use(requestLoggerMiddleware(options.logger))
        }

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

                // Log error
                let logger = request.logger || options.logger
                if (logger) {
                    if (error.status && error.status >= 400 && error.status < 500) {
                        logger.warn(error)
                    } else {
                        logger.error(error)
                    }
                }
            }

            response.status(error.status || 500)
            response.json(responseContent)
        })

        return app
    },
}
