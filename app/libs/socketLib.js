const socketio = require('socket.io')
const tokenLib = require('./tokenLib')
const check = require('./checkLib')
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
//here server is http server initialized in app.js
let setServer = (server) => {

    //socket initialization
    let io = socketio.listen(server)
    let myIo = io.of('') //no namespace

    //main event handler,inside this series of events can be handled
    myIo.on('connection', (socket) => {
        socket.emit("verifyUser", "verifying user details"); //event emit=>listening on frontend

        socket.on('set-user', (authToken) => {
            console.log("set-user called")
            if (check.isEmpty(authToken)) {
                console.log('Empty authToken')
            } else {
                tokenLib.verifyClaims(authToken, (err, user) => {
                    if (err) {
                        socket.emit('auth-error', {
                            status: 500,
                            error: 'Please provide correct auth token'
                        })
                    } else {

                        console.log("user is verified..setting details");
                        let currentUser = user.data;
                        console.log(currentUser)
                        // setting socket user id 
                        socket.userId = currentUser.userId
                        let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                        let key = currentUser.userId
                        let value = fullName

                    }
                })
            }
        })

        socket.on('friend-req-send', (senderInfo) => {
            console.log(senderInfo);

            let notification = {
                senderId: senderInfo.senderId,
                receiverId: senderInfo.receiverId,
                message: `You have received friend request from ${senderInfo.userName}`
            }
            myIo.emit(senderInfo.receiverId, notification)
        }) //end socket listening with event(friend-info)

        socket.on('friend-accept-request', (receiverInfo) => {
            console.log(receiverInfo)
            let notification = {
                senderId: receiverInfo.senderId,
                message: `${receiverInfo.userName} has accepted your request`
            }
            myIo.emit('fRAccept' + receiverInfo.senderId, notification)
        }) //end socket listening

        socket.on('multi-todo-create', (data) => {
            console.log(data.createdBy)
            console.log(data.senderId)
            if (data.createdBy && data.createdBy !== data.senderId) {
                UserModel.findOne({
                    'userId': data.createdBy
                })
                    .select('friends -_id')
                    .lean()
                    .exec((err, result) => {

                        console.log('\n\n\n\nresult if')
                        console.log(result)
                        myIo.emit('create' + data.createdBy, data.message);

                        if (result && result.friends.length > 0) {
                            for (let d of result.friends) {

                                if (data.senderId !== d.friendId)
                                    myIo.emit('create' + d.friendId, data.message);
                            }
                        }
                    })
            } else {
                UserModel.findOne({
                    'userId': data.senderId
                })
                    .select('friends -_id')
                    .lean()
                    .exec((err, result) => {

                        console.log('\n\n\n\nresult else')
                        console.log(result)
                        if (result && result.friends.length > 0) {
                            for (let d of result.friends) {
                                myIo.emit('create' + d.friendId, data.message);
                            }
                        }
                    })
            }
        })

        socket.on('logout', (userId) => {
            socket.disconnect();
        })
        socket.on('disconnect', () => {
            console.log('user is disconnected');
            console.log(socket.userId);
        }) //end of on disconnect

    }) //end main socket 'connection
} //end setServer


module.exports = {
    setServer: setServer
}