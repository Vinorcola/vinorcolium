
"use strict"

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
            fetchControllers(app, filePath, logger)
        } else if (file.substr(-13) === "Controller.js") {
            let requirePath = filePath.substr(0, filePath.length - 3)
            mountController(app, require(requirePath), logger)
        }
    })
}

const mountController = (app, controller, logger) => {
    controller.actions.map(action => {
        let path = controller.prefix + action.path
        if (process.env.NODE_ENV === "development" && logger) {
            logger.info("Mount " + action.method.toUpperCase() + "\t" + (path === "" ? "/" : path))
        }

        app[action.method.toLowerCase()](path, (request, response, next) => {

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
            if (controller.validation) {
                for (let attribute in controller.validation) {
                    data[attribute] = request.params[attribute] || request.body[attribute]
                    for (let validation of controller.validation[attribute]) {
                        validations.push(validation(data[attribute]))
                    }
                }
            }
            if (action.validation) {
                for (let attribute in action.validation) {
                    data[attribute] = request.params[attribute] || request.body[attribute]
                    for (let validation of action.validation[attribute]) {
                        validations.push(validation(data[attribute]))
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
    })
}

module.exports = fetchControllers
