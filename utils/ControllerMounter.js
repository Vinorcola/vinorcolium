
"use strict"

const express = require("express")
const fs = require("fs")
const path = require("path")

const AccessDeniedError = require("../error/AccessDeniedError")
const InvalidAuthenticationError = require("../error/InvalidAuthenticationError")



/**
 * Mount all the controllers found in the given directory.
 *
 * @param app
 * @param directoryPath
 * @param logger
 */
const fetchControllers = (app, directoryPath, logger) => {
    fs.readdirSync(directoryPath).forEach(file => {
        let filePath = directoryPath + path.sep + file
        let fileStats = fs.lstatSync(filePath)
        if (fileStats.isDirectory()) {
            fetchControllers(filePath)
        } else if (file.substr(-13) === "Controller.js") {
            let requirePath = filePath.substr(0, filePath.length - 3)
            mountController(app, require(requirePath), logger)
        }
    })
}

const mountController = (app, controller, logger) => {
    let router = express.Router()

    for (let action of controller.actions) {
        if (process.env.NODE_ENV === "development" && logger) {
            let path = controller.prefix + action.path
            logger.info("Mount " + action.method.toUpperCase() + "\t" + (path === "" ? "/" : path))
        }
        mountAction(router, action)
    }
    app.use(controller.prefix, router)
}

const mountAction = (router, action) => {
    router[action.method.toLowerCase()](action.path, (request, response, next) => {

        // Run authorizations.
        if (action.authorization) {
            if (!request.userAccount) {
                next(new InvalidAuthenticationError("No authentication token provided."))
                return
            }
            if (!request.userAccount.authorizations.includes(action.authorization)) {
                next(new AccessDeniedError("Access denied to the resource.", action.authorization))
                return
            }
        }

        // Run validations.
        let data = {}
        let validations = []
        if (action.validation) {
            for (let attribute in action.validation) {
                data[attribute] = request.body[attribute]
                for (let validation of action.validation[attribute]) {
                    validations.push(validation(request.body[attribute]))
                }
            }
        }
        Promise.all(validations)

            // Call action handler with validated data, and authenticated user account.
            .then(() => action.handler(data, request.userAccount, request.logger))

            // Send result to response.
            .then(result => {
                response.json(Object.assign({
                    ok: true,
                }, result))
            })

            // Catch any error.
            .catch(next)
    })
}

module.exports = fetchControllers
