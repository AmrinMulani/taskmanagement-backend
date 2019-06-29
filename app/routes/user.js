const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const appConfig = require("../../config/appConfig");
const auth = require("../middlewares/auth");
const forgotPassEmail = require("../controllers/nodemail")

module.exports.setRouter = app => {
   let baseUrl = `${appConfig.apiVersion}/users`;

   // defining routes.
   app.post(`${baseUrl}/signup`, userController.signUpFunction);

   /**
      * @apiGroup User
      * @apiVersion  1.0.0
      * @api {post} /api/v1/users/signup User SignUp.
      *
      * @apiParam {string} email email address of the user. (body params) (required)
      * @apiParam {string} firstName firstName of the user. (body params) (required)
      * @apiParam {string} lastName lastName of the user. (body params)
      * @apiParam {string} countryCode countryCode of the user. (body params) (required)
      * @apiParam {string} country country name of the user. (body params) (required)
      * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
      * @apiParam {string} fullName full Name of the user. (body params) (required)
      * @apiParam {string} password password of the user. (body params) (required)
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Signed up successfully",
             "status": 200,
             "data": {
                 "userId":string,
                 "email": string
                 "firstName": string,
                 "lastName": string,
                 "fullName": string,
                 "country" : string,
                 "countryCode" : string,
                 "mobileNumber" : number,
                 "friends": [],
                 "friendRequestSent": [],
                 "friendRequestRecieved": [],
                 "createdOn": date,
             }
         }
         @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "Failed to create new user",
         "status": 500,
         "data": null
        }
     */

   app.post(`${baseUrl}/login`, userController.loginFunction);
   /**
      * @apiGroup User
      * @apiVersion  1.0.0
      * @api {post} /api/v1/users/login User Login.
      *
      * @apiParam {string} email email of the user. (body params) (required)
      * @apiParam {string} password password of the user. (body params) (required)
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Login successful!!",
             "status": 200,
             "data": {
                 "authToken": string,
                 "userDetails": {
                     "userId":string,
                     "email": string
                     "firstName": string,
                     "lastName": string,
                     "fullName": string,
                     "country" : string,
                     "countryCode" : string,
                     "mobileNumber" : number,
                     "friends": [],
                     "friendRequestSent": [],
                     "friendRequestRecieved": []
                 }
             }
         }
         @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "Login failed",
         "status": 500,
         "data": null
        }
     */

   app.post(`${baseUrl}/logout`, auth.isAuthorize, userController.logoutFunction);
   /**
  * @apiGroup User
  * @apiVersion  1.0.0
  * @api {post} /api/v1/users/logout User logout.
  *
  * @apiParam {string} userId userId of the user. (body params) (required)
  * 
  * @apiSuccessExample {object} Success-Response:
      {
         "error": false,
         "message": "Logged out successfully",
         "status": 200,
         "data": null
     }
     @apiErrorExample {json} Error-Response:
  *
  * {
     "error": true,
     "message": "Failed",
     "status": 500,
     "data": null
    }
 */
   app.post(`${baseUrl}/forgotpassword/:Email`, forgotPassEmail.sendMail);
   /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgotpassword User forgotpassword.
     *
     * @apiParam {string} email email of the user. (route params) (required)
     
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Email sent successful!!",
            "status": 200,
            "data": null
            }
        }
        @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed to Email send ",
        "status": 500,
        "data": null
       }
    */

   app.post(`${baseUrl}/resetpassword`, userController.resetPassword);
   /**
      * @apiGroup User
      * @apiVersion  1.0.0
      * @api {post} /api/v1/users/resetpassword User resetpassword.
      *
      * @apiParam {string} email email of the user. (body params) (required)
      * @apiParam {string} password password of the user. (body params) (required)
      
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Password reset successfully",
             "status": 200,
             "data": null
             }
         }
         @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "Failed to reset password ",
         "status": 500,
         "data": null
        }
     */
};


