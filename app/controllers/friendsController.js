const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const passwordLib = require("../libs/passwordLib");
const tokenLib = require("../libs/tokenLib");
//const emailLib = require('../libs/eilLib');

/* Models */
const UserModel = mongoose.model("User");
const AuthModel = mongoose.model("Auth");


//const FriendRelationModel = mongoose.model("FriendRelation");

let getAllRequestSent = (req, res) => {
    UserModel.find({ 'userId': req.params.userId })
        .select('friendRequestSent -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Friend Controller: getAllRequestSent', 10)
                let apiResponse = response.generate(true, 'Failed To Find Sent Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Sent Request Found', 'Friend Controller=> getAllRequestSent')
                let apiResponse = response.generate(true, 'No Sent Request Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All user Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestSent

let getFindUser = (req, res) => {

    UserModel.find({ userId: { $ne: req.params.userId } })
        .select("-__v -_id")
        .lean()
        .exec((err, result) => {
            //console.log(result)
            if (err) {
                logger.error(err.message, 'Friend Controller: getAllRequestSent', 10)
                let apiResponse = response.generate(true, 'Failed To User ', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Sent Request Found', 'Friend Controller=> getAllRequestSent')
                let apiResponse = response.generate(true, 'No user Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All list  Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestSent

let getAllRequestRecieved = (req, res) => {
    UserModel.findOne({ userId: req.params.userId })
        .select('friendRequestRecieved')
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Friend Controller: getAllRequestRecieved', 10)
                let apiResponse = response.generate(true, 'Failed To Find Recieved Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result.friendRequestRecieved)) {
                logger.info('No Recieved Request Found', 'Friend Controller: getAllRequestRecieved')
                let apiResponse = response.generate(true, 'There is no Friend Request', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Recieved Requests Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestRecieved
let sendFriendRequest = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Sending request', 'friendController: sendFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSender = () => {
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }
        let options = {
            $push: {
                friendRequestSent: { $each: [subOptions] }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSender', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSender')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSender

    let updateReciever = () => {

        let options = {
            $push: {
                friendRequestRecieved: {
                    friendId: req.body.senderId,
                    friendName: req.body.senderName,
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateReciever', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciever not Found', 'Friend Controller: updateReciever')
                    let apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    //let apiResponse = response.generate(false, 'Updated Reciever with Recieved requests', 200, null)
                    resolve(result)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateSender)
        .then(updateReciever)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request Sent', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
}//end sendFriendRequest


let acceptFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: acceptFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSenderFriendList = () => {
        let options = {
            $push: {
                friends: {
                    friendId: req.body.recieverId,
                    friendName: req.body.recieverName,
                }
            },
            $pull: {
                friendRequestSent: {
                    friendId: req.body.recieverId,
                    friendName: req.body.recieverName,
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateSenderFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderFriendList')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderFriendList

    let updateRecieverFriendList = () => {

        let options = {
            $push: {
                friends: {
                    friendId: req.body.senderId,
                    friendName: req.body.senderName,
                }
            },
            $pull: {
                friendRequestRecieved: {
                    friendId: req.body.senderId,
                    friendName: req.body.senderName,
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciver Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverFriendList')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Reciver Friend List', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverFriendList

    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Accepted Friend Request', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
} //acceptFriendRequest


let rejectFriendRequest = (req, res) => {


    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: rejectFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input


    let updateSenderSentRequest = () => {
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName
        }

        let options = {
            $pull: {
                friendRequestRecieved: { subOptions }
            }
        }
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {

                    logger.error(err.message, 'Friend Controller:updateSenderSentRequest', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSenderSentRequest')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateRecieverRequestRecieved = () => {
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName
        }

        let options = {
            $pull: {
                friendRequestSent: { subOptions }
            }
        }
        return new Promise((resolve, reject) => {

            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    //console.log("Error in verifying" + err)
                    logger.error(err.message, 'Friend Controller:updateRecieverRequestRecieved', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'Friend Controller: updateRecieverRequestRecieved')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderSentRequest)
        .then(updateRecieverRequestRecieved)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Rejected Friend Request', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
}//rejectFriendRequest

let getAllFriend = (req, res) => {

    UserModel.findOne({ userId: req.params.userId })
        .select('friends')
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'FriendsController: getAllRequestRecieved', 10)
                let apiResponse = response.generate(true, 'Failed To Find Friend', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result.friends)) {
                logger.info('NO Friend Found', 'FriendsController: getAllRequestRecieved')
                let apiResponse = response.generate(true, 'There is no Friend ', 400, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Friends', 200, result)
                res.send(apiResponse)
            }
        })
}// end getAllRequestRecieved

let getAllUserD = (req, res) => {
    let arrayofuser = [];

    UserModel.findOne({ 'userId': req.params.userId })
        .select('friendRequestSent friendRequestRecieved friends')
        .exec((err, result) => {

            if (err) {
                logger.error(err.message, 'FriendsController: getAllRequestSent', 10)
                let apiResponse = response.generate(true, 'Failed To Find Sent Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Sent Request Found', 'FriendsController=> getAllRequestSent')
                let apiResponse = response.generate(true, 'No Sent Request Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All user Found', 200, result)
                //   res.send(apiResponse)

                let fiendship = apiResponse.data
                let frd = fiendship.friends
                let rfrd = fiendship.friendRequestRecieved
                let sfrd = fiendship.friendRequestSent

                arrayofuser.push(req.params.userId)

                setTimeout(() => {

                    if (!check.isEmpty(frd)) {
                        for (let x of frd) {
                            arrayofuser.push(x.friendId)
                        }
                    }
                    if (!check.isEmpty(rfrd)) {
                        for (let x of rfrd) {
                            arrayofuser.push(x.friendId)
                        }
                    }
                    if (!check.isEmpty(sfrd)) {
                        for (let x of sfrd) {
                            arrayofuser.push(x.friendId)
                        }
                    }
                    console.log('\n\n\n\n array of user\n' + arrayofuser)
                    UserModel.find({ 'userId': { $nin: arrayofuser } })
                        .select()
                        .lean()
                        .exec((err, result) => {
                            if (err) {
                                logger.error(err.message, 'FriendsController: getAllRequestSent', 10)
                                let apiResponse = response.generate(true, 'Failed To User ', 500, null)
                                res.send(apiResponse)
                            } else if (check.isEmpty(result)) {
                                logger.info('No Sent Request Found', 'FriendsController=> getAllRequestSent')
                                let apiResponse = response.generate(true, 'No user Found', 404, null)
                                res.send(apiResponse)
                            } else {
                                console.log('result')

                                let apiResponse = response.generate(false, 'All list  Found', 200, result)
                                res.send(apiResponse)
                                console.log(apiResponse)
                            }
                        })
                }, 1000);
            }
        })
}// end getAllRequestSent

module.exports = {
    getAllRequestSent: getAllRequestSent,
    getFindUser: getFindUser,
    getAllRequestRecieved: getAllRequestRecieved,
    sendFriendRequest: sendFriendRequest,
    acceptFriendRequest: acceptFriendRequest,
    rejectFriendRequest: rejectFriendRequest,
    getAllFriend: getAllFriend,
    getAllUserD: getAllUserD

}