var doctorMock = require("./doctor.mock.json");

module.exports = function () {
    var api = {
        addFavoriteUserById: addFavoriteUserById
    };
    return api;

    function addFavoriteUserById(doctorId, userId) {
        for(var i in doctorMock) {
            if(doctorMock[i].d_id == doctorId) {
                doctorMock[i].favoritedBy.push(userId);
                return doctorMock[i];
            }
        }
        var newDoctor = {};
        newDoctor.uid = doctorId;
        newDoctor.favoritedBy = [userId];
        newDoctor.ratedBy = [];
        doctorMock.push(newDoctor);
        return doctorMock;
    }
};
