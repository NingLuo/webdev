var doctorMock = require("./doctor.mock.json");

module.exports = function () {
    var api = {
        addFavoriteUserById: addFavoriteUserById,
        addRate: addRate
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

    function addRate(doctorId, rate) {
        console.log(doctorId);
        console.log("--------------------");
        console.log(rate);
        for(var i in doctorMock) {
            if(doctorMock[i].uid == doctorId) {
                doctorMock[i].rates.push(rate);
                return doctorMock[i];
            }
        }
        //if there does not exist a doctor, then create a new one
        var newDoctor = {};
        newDoctor.uid = doctorId;
        newDoctor.favoritedBy = [];
        newDoctor.rates = [rate];
        doctorMock.push(newDoctor);

        return doctorMock;
    }
};
