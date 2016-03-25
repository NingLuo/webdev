module.exports = function(app) {
    console.log("project server app online!");
    //var ApiService = require("./services/api.service.server.js")(app, factual);
    var UserModel = require("./models/user.model.js")();
    var DoctorModel = require("./models/doctor.model.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel);
    var DoctorService = require("./services/doctor.service.server.js")(app, DoctorModel);
};
