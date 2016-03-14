module.exports = function (app) {
    console.log("server app.js");
    var model = require("./models/user.model.js")();
    var service = require("./services/user.service.server.js")(app, model);
}
