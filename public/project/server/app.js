module.exports = function(app, db) {
    console.log("project server app online!");
    //var UserModel = require("./models/user.model.js")();
    var UserModel = require("./models/user/user.model.server.js")();
    //var DoctorModel = require("./models/doctor.model.js")();
    var DoctorModel = require("./models/doctor/doctor.model.server.js")();
    var ReviewModel = require("./models/review/review.model.server.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel);
    var DoctorService = require("./services/doctor.service.server.js")(app, DoctorModel);
    var ReviewService = require("./services/review.service.server.js")(app, ReviewModel);
};
