var doctorMock = require("./doctor.mock.json");

module.exports = function () {
    var api = {
        addFavoriteUserById: addFavoriteUserById,
        addRate: addRate,
        updateRate: updateRate,
        findDoctorById: findDortorById,
        findRateById: findRateById,
        deleteRate: deleteRate
    };
    return api;

    function findDortorById(doctorId) {
        for(var i in doctorMock) {
            if(doctorMock[i].uid == doctorId) {
                return doctorMock[i];
            }
        }
        return null;
    }

    function findRateById(rates, rateId) {
        for(var i in rates) {
            if(rates[i].id == rateId) return rates[i];
        }
        return null;
    }

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

    function updateRate(doctorId, newRate) {
        var doctor = findDortorById(doctorId);
        var rate = findRateById(doctor.rates, newRate.id);
        rate.overall = newRate.overall;
        rate.bedsideManner = newRate.bedsideManner;
        rate.waitTime = newRate.waitTime;
        rate.comments = newRate.comments;
        rate.reviewDate = newRate.reviewDate;

        return;
    }

    function deleteRate(doctorId, rateId) {
        var doctor = findDortorById(doctorId);
        for(var i in doctor.rates) {
            if(doctor.rates[i].id == rateId) {
                doctor.rates.splice(i, 1);
                return;
            }
        }
        return null;
    }
};
