const express = require("express");
const router = express.Router();
const friendsController = require("../controllers/friendsController");
const appConfig = require("./../../config/appConfig");
const auth = require("../middlewares/auth");
//my bad
module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/friendRequest`;

    app.post(`${baseUrl}/accept/friend/request`, auth.isAuthorize, friendsController.acceptFriendRequest);
    /**
   * @apiGroup friends
   * @apiVersion  1.0.0
   * @api {get} /api/v1/friendRequest/accept/friend/request  Accept Friend Request.
   *
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} senderId Id of the Sender. (body params) (required)
   * @apiParam {string} senderName Name of the Sender. (body params) (required)
   * @apiParam {string} recieverId Id of the Reciever(Login User). (body params) (required)
   * @apiParam {string} recieverName Name of the Reciever(Login User). (body params) (required)
   * 
   * @apiSuccessExample {object} Success-Response:
      {
          "error": false,
          "message": "Accepted Friend Request",
          "status": 200,
          "data": null
      }
  */

    app.get(`${baseUrl}/viewfriend/request/sent/:userId`, auth.isAuthorize, friendsController.getAllRequestSent);
    /**
   * @apiGroup friends
   * @apiVersion  1.0.0
   * @api {get} /api/v1/friendRequest/viewfriend/request/sent/:userId Get all friends request sent.
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} userId Id of the user. (header params) (required)
   * 
   * @apiSuccessExample {object} Success-Response:
      {
          "error": false,
          "message": "All Sent Requsts Found",
          "status": 200,
          "data": [
              {
                  "_id": ObjectId
                  "friendRequestSent": [
                      {
                          "friendId":string,
                          "friendName":string,
                          "_id": ObjectId
                      }
                  ]
              }
          ]
      }
  */


    app.get(`${baseUrl}/viewfriend/request/recieved/:userId`, auth.isAuthorize, friendsController.getAllRequestRecieved);
    /**
     * @apiGroup friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friendRequest/viewfriend/request/recieved/:userId  Get all friends request Recieved.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} UserId Id of the user. (route params) (required)
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
     {
         "error": false,
         "message": "All Recieved Requsts Found",
         "status": 200,
         "data": [
             {
                 "_id": ObjectId,
                 "friendRequestRecieved": [
                     {
                         "friendId": string
                         "friendName": string
                         "_id": objectId
                     }
                 ]
             }
         ]
     }
    */

    app.post(`${baseUrl}/send/friend/request`, auth.isAuthorize, friendsController.sendFriendRequest);
    /**
   * @apiGroup friends
   * @apiVersion  1.0.0
   * @api {get} /api/v1/friendRequest/send/friend/request  Send Friend Request.
   *
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} senderId Id of the Sender. (body params) (required)
   * @apiParam {string} senderName Name of the Sender. (body params) (required)
   * @apiParam {string} recieverId Id of the Reciever. (body params) (required)
   * @apiParam {string} recieverName Name of the Reciever. (body params) (required)
   * 
   * @apiSuccessExample {object} Success-Response:
      {
          "error": false,
          "message": "Friend Request Sent",
          "status": 200,
          "data": null
      }
  */

    app.get(`${baseUrl}/view/friends/:userId`, auth.isAuthorize, friendsController.getAllFriend);
    /**
     * @apiGroup friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friendRequest/viewfriend/view/friends/:userId  Get all friends request Recieved.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} UserId Id of the user. (route params) (required)
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
     {
         "error": false,
         "message": "All Friend list Found",
         "status": 200,
         "data": [
             {
                 "_id": ObjectId,
                 "friends": [
                     {
                         "friendId": string
                         "friendName": string
                         "_id": objectId
                     }
                 ]
             }
         ]
     }
    */

    //app.get(`${baseUrl}/view/details/:userId`, auth.isAuthorize, friendsController.getAllUserD);

    app.get(`${baseUrl}/userlist/:userId`, auth.isAuthorize, friendsController.getAllUserD);


    app.post(`${baseUrl}/reject/friend/request`, auth.isAuthorize, friendsController.rejectFriendRequest);
};
