module.exports = function(app, factual) {
    console.log("project server app online!");
    var ApiService = require("./services/api.service.server.js")(app, factual);
}
