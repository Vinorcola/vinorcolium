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
            handler(data) {
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
* `middleware`, an array of specific middleware that will be called before the handler.
* `handler`, an handler function that must return a promise.

The handler function will receive 2 arguments:

1. The data extracted and validated from the request;
1. Some extra-data such as:
    * The `request` object, which is the Express request (avoid using request as much as possible. Use validation instead);
    * The `repsonse` object, which is the Express response (avoid using response as much as possible. Resolve object instead);
    * The `user` object that represent the authenticated user account (if the user has been authenticated, `undefined` otherwise);
    * The `logger` object.

If the promise returned by the handler resolve the response object, then this response will simply be sent. Otherwise, a 200 response will be sent and the resolved object will be transformed into JSON and send in the response body.

The rest of the implementation is up to you: create your models, repositories, whatever you want/need...

## Request validation

An action can have a `validation` property that is an object describing the request validation. The action handler does not have access to the request object. Instead, it only has access to validated data.

So if you want to get data from the request, you must validate it:

```javascript
// An action

const NotNullValidator = require("vinorcolium/validator/NotNullValidator")

{
    path: "/some/uri/with/:aParam/and/:anotherParam",
    method: "post",
    validation: {
        aParam: [],
        title: [
            NotNullValidator("Some error message to display back in the response body in case the validator fail."),
            MinLengthValidator(3, "Title must be at least 3 characters long.")
        ],
    },
    handler({ aParam, title }) {
        // ...
    },
}
```
 
Data can come as a URL param or in the request body as JSON object. URL parameters have priority over body parameters.

In the example above, the first parameter object in the handler will have 2 properties: `aParam` (coming from the URL) and `title` (coming from the request body). Those properties have pass all the validators. If a validator fails, the handler is never called. An error is sent back to the response instead.

Note that the `anotherParam` from the URL is not validated, so it will not appear in the data object. The same will apply for any extra parameters in the request body: as long as you do not mention the param in the validation object, it will not be extracted from the request. If you just need to extract a value without validating it, you must provide an empty array like we did for the `aParam` parameter.
