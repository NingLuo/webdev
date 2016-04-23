var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("Project_User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        addFavoriteByUid: addFavoriteByUid,
        checkFavorite: checkFavorite,
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

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({"username": username});
    }

    function updateUser(newUser) {
        var userId = mongoose.Types.ObjectId(newUser._id);
        delete newUser._id;
        return User.update({"_id": userId}, newUser);
    }

    function addFavoriteByUid(userId, doctorUid) {
        userId = mongoose.Types.ObjectId(userId);
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

    function checkFavorite(userId, doctorUid) {
        userId = mongoose.Types.ObjectId(userId);
        return User.findOne({'_id': userId, 'favorites': doctorUid});
    }

    function unfavorite(userId, doctorUid) {
        userId = mongoose.Types.ObjectId(userId);
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
        userId = mongoose.Types.ObjectId(userId);
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
        userId = mongoose.Types.ObjectId(userId);
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
        targetUserId = mongoose.Types.ObjectId(targetUserId);
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
        userId = mongoose.Types.ObjectId(userId);
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
        userId = mongoose.Types.ObjectId(userId);
        msgId = mongoose.Types.ObjectId(msgId);
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
        myUserId = mongoose.Types.ObjectId(myUserId);
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
