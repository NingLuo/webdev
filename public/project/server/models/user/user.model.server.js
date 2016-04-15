var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("Project_User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        addFavoriteByUid: addFavoriteByUid,
        unfavorite: unfavorite,
        addReview: addReview,
        deleteReview: deleteReview,
        sendMsgTo: sendMsgTo
    };
    return api;

    function createUser(newUser) {
        return User.create(newUser);
    }

    function findUserByCredentials(credentials) {
        return User.findOne({email: credentials.email, password: credentials.password});
    }

    function updateUser(newUser) {
        var userId = mongoose.Types.ObjectId(newUser._id);
        delete newUser._id;
        return User.update({"_id": userId}, newUser);
    }

    function addFavoriteByUid(userId, doctorUid) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    //need to check if the user has already favorited this doctor
                    for(var i in user.favorites) {
                        if(user.favorites[i] == doctorUid) return "You have alreay liked this doctor before!";
                    }
                    user.favorites.push(doctorUid);
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function unfavorite(userId, doctorUid) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    for(var i in user.favorites) {
                        if(user.favorites[i] == doctorUid) {
                            user.favorites.splice(i, 1);
                            break;
                        }
                    }
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function addReview(userId, reviewId) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    user.reviews.push(reviewId);
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function deleteReview(userId, reviewId) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    for(var i in user.reviews) {
                        if(user.reviews[i] == reviewId) {
                            user.reviews.splice(i, 1);
                            break;
                        }
                    }
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function sendMsgTo(receiverId, message) {
        return User
            .findById(receiverId)
            .then(
                function (user) {
                    user.messages.push(message);
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};
