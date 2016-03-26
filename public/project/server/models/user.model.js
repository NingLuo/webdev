var userMock = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateProfile: updateProfile,
        findUserById: findUserById,
        addFavoriteByUid: addFavoriteByUid,
        addRateByUid: addRateByUid,
        findRatesByUserId: findRatesByUserId,
        updateRate: updateRate,
        deleteRate: deleteRate
    };
    return api;

    function findUserByCredentials(credentials) {
        for(var i in userMock) {
            if(userMock[i].email === credentials.email && userMock[i].password === credentials.password) {
                return userMock[i];
            }
        }
        return null;
    }

    function createUser(newUser) {
        newUser._id = uuid.v4();
        userMock.push(newUser);
        return newUser;
    }

    function updateProfile(profile) {
        var user = findUserById(profile.userId);
        user.username = profile.username;
        user.email = profile.email;
        user.password = user.password;

        return user;
    }

    function findUserById(id) {
        for(var i in userMock) {
            if(userMock[i].u_id == id) {
                return userMock[i];
            }
        }
        return null;
    }

    function addFavoriteByUid(userId, doctorUid) {
        var user = findUserById(userId);
        user.favorites.push(doctorUid);
        return user;
    }

    function addRateByUid(userId, rate) {
        var user = findUserById(userId);
        user.rates.push(rate);
        return user;
    }

    function findRatesByUserId(userId) {
        var user = findUserById(userId);
        return user.rates;
    }

    function updateRate(userId, rate) {
        var rates = findRatesByUserId(userId);
        for(var i in rates) {
            if(rates[i].id == rate.id) {
                rates[i].id= rate.id;
                rates[i].userId= rate.userId;
                rates[i].username= rate.username;
                rates[i].doctorId= rate.doctorId;
                rates[i].doctorName= rate.doctorName;
                rates[i].doctorImage= rate.doctorImage;
                rates[i].reviewDate= rate.reviewDate;
                rates[i].overall= rate.overall;
                rates[i]. waitTime= rate.waitTime;
                rates[i].bedsideManner= rate.bedsideManner;
                rates[i].comments= rate.comments;

                console.log(rates[i]);
            }
        }
    }

    function deleteRate(userId, rateId) {
        var rates = findRatesByUserId(userId);
        for(var i in rates) {
            if(rates[i].id == rateId) {
                rates.splice(i, 1);
                return rates;
            }
        }
    }
};
