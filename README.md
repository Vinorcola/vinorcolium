# Vinorcolium framework

Enhance express to make JSON APIs easy.

## Usage

First, create an application into your `index.js`/`app.js`/`main.js`:

```javascript
"use strict"

const vinorcolium = require("vinorcolium")

let app = vinorcolium.createApp({
    controllerPath: __dirname + "/src/Controller",
    secret: "Some secret string used for JWT encryption.",
})

module.exports = app
```

Then, creates your controllers into the directory configured bellow:

```javascript
// src/Controller/MainController.js

"use strict"

const generateUuid = require("uuid/v4")
const MinLengthValidator = require("vinorcolium/validator/MinLengthValidator")
const NotNullValidator = require("vinorcolium/validator/NotNullValidator")

const itemRepository = require("../Repository/ItemRepository")



module.exports = {
    prefix: "/item",
    actions: [
        {
            path: "",
            method: "get",
            handler: () => (
                itemRepository
                    .getAll()
                    .then(items => Promise.resolve({
                        items: items,
                    }))
            ),
        },
        {
            path: "/create",
            method: "post",
            authorization: "admin",
            validation: {
                title: [
                    NotNullValidator("Must provide a title for the item to create."),
                    MinLengthValidator(3, "Title for the item must be at least 3 characters long."),
                ],
            },
            handler: data => {
                let item = {
                    id: generateUuid(),
                    title: data.title,
                }
                return itemRepository
                    .add(item)
                    .then(() => Promise.resolve({
                        id: item.id,
                    }))
            },
        },
    ],
}
```

Controller files must finish by `Controller.js`. A controller is an object having 2 properties:

* `prefix`, the URL prefix for the controller;
* `actions`, an array of actions.

An action is an object having the following properties:

* `path`, the URL to the action;
* `method`, the HTTP method for the action;
* `authorization`, a particular authorization the user must have in order to execute the action (optional: public action if no authorization required);
* `validation`, an object representing the validation to apply to the request;
* `handler`, an handler function that must return a promise.

The handler function will receive 3 arguments:

1. The data extracted and validated from the request;
2. The user account object (if the user has been authenticated) or `undefined`;
3. The logger.

If the promise returned by the handler resolve, a 200 response will be sent and the resolved object will be transformed into JSON and send in the response body.

The rest of the implementation is up to you: create your models, repositories, whatever you want/need...
