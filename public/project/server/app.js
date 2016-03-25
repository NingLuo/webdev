module.exports = function(app) {
    console.log("project server app online!");
    //var ApiService = require("./services/api.service.server.js")(app, factual);
    var UserModel = require("./models/user.model.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel);
};
