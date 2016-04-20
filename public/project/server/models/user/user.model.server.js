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
        sendMsgTo: sendMsgTo,
        findMessageByUserId: findMessageByUserId,
        removeMsg: removeMsg,
        saveMyMsg: saveMyMsg
    };
    return api;

    function createUser(newUser) {
        return User.create(newUser);
    }

    function findUserByCredentials(credentials) {
        return User.findOne({username: credentials.username, password: credentials.password});
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

    function sendMsgTo(targetUserId, newMessage) {
        return User
            .findById(targetUserId)
            .then(
                function (user) {
                    var message = user.messages.filter(function (messages) {
                        return messages.senderName == newMessage.senderName;
                    }).pop();
                    if(!message) {
                        user.messages.push(newMessage);
                        return user.save();
                    }
                    else {
                        message.msgContent.push(newMessage.msgContent[0]);
                        return user.save()
                    }
                },
                function (err) {
                    console.log(err, "sendMsgTo UserModel");
                }
            );
    }

    function findMessageByUserId(userId) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    return user.messages;
                },
                function () {
                    console.log(err);
                }
            )
    }

    function removeMsg(userId, msgId) {
        return User
            .findById(userId)
            .then(
                function (user) {
                    user.messages.pull(msgId);
                    return user.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function saveMyMsg(myUserId, messageId, newMessage) {
        return User
            .findById(myUserId)
            .then(
                function (user) {
                    var message = user.messages.filter(function (messages) {
                        return messages._id == messageId;
                    }).pop();
                    message.msgContent.push(newMessage.msgContent[0]);
                    return user.save()
                },
                function (err) {
                    console.log(err, "saveMyMsg");
                }
            )
    }
};
