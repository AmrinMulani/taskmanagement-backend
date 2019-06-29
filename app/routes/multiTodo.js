const express = require("express");
const router = express.Router();
const multiTodoController = require("../controllers/multiToDoController");
const appConfig = require("../../config/appConfig");
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/multitodo`;

  //create the list for multi user 
  app.post(`${baseUrl}/createtodo`, auth.isAuthorize, multiTodoController.createTodo);
  /**
  * @apiGroup MultiUser
  * @apiVersion  1.0.0
  * @api {post} /api/v1/multitodo/createtodo Create a list
  * 
  * @apiParam {boolean} isCompleted completed of the list. (body params) (required)
  * @apiParam {string}  changed changed title  of the list. (body params) (required)
  * @apiParam {string} remarks remarks of history of the list. (body params) (required) 
  * @apiParam {string} trnId trnId transacton of the list. (body params) (required)
  * @apiParam {string} multiToDoId multiToDoId of the list. (body params) (required)
  * @apiParam {string} title title of the list. (body params) (required)
  * @apiParam {string} createdBy createdBy of the list. (body params) (required)
  * @apiParam {string} editBy editBy of the list. (body params) (required)
  * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
  *
  * @apiSuccessExample {object} Success-Response:
  *  {
         "error": false,
         "message": "save the history successfully",
         "status": 200,
         "data": {        
                   "isCompleted":boolean,
                   "changed":string
                   "remarks": string,
                   "createdOn":date,
                   "trnId":string,
                   "multiToDoId":string,
                   "oldTitle":string,
                   "createdBy":string,
                   "editBy":string
    
                 }
     }
   * @apiSuccessExample {object} Success-Response:
      {
         "error": false,
         "message": "List created successfully",
         "status": 200,
         "data": {        
                    "isCompleted":boolean,
                    "createdOn":date,
                    "multiToDoId":string,
                    "title":string,
                    "createdBy": string 
                 }
     }
     
     @apiErrorExample {json} Error-Response:
*
* {
   "error": true,
   "message": "Failed to create a new List",
   "status": 500,
   "data": null
  }
*/

  app.get(`${baseUrl}/alltodo/:userId`, auth.isAuthorize, multiTodoController.getToDoList);
  /**
 * @apiGroup MultiUser
 * @apiVersion  1.0.0
 * @api {get} /api/v1/multitodo/alltodo/:userId    Get all list
 * 
 * @apiParam {string} createdBy createdBy of the list. (route params) (required)
 * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
 *
 * @apiSuccessExample {object} Success-Response:
     {
        "error": false,
        "message": "All list fetch successfully",
        "status": 200,
        "data": [
          {        
                   "isCompleted":boolean,
                   "createdOn":date,
                   "multiToDoId":string,
                   "title":string,
                   "createdBy": string 
          }
         ]
    }
    
    @apiErrorExample {json} Error-Response:
*
* {
  "error": true,
  "message": "Failed to create a new List",
  "status": 500,
  "data": null
 }
*/
  app.post(`${baseUrl}/deletetodo/:multiToDoId`, auth.isAuthorize, multiTodoController.delTodoList);
  /**
      * @apiGroup MultiUser
      * @apiVersion  1.0.0
      * @api {post} /api/v1/multitodo/deletetodo/:multiToDoId Delete a list by multiToDoId.
      * 
      * @apiParam {string} multiToDotId multiToDoId of the list. (route params) (required)
      * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "List deleted successfully",
             "status": 200,
             "data": null
         }
         @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Failed to delete a list",
       "status": 500,
       "data": null
      }
     */
  app.put(`${baseUrl}/edittodo`, auth.isAuthorize, multiTodoController.editToDo);
  /**
  * @apiGroup MultiUser
  * @apiVersion  1.0.0
  * @api {put} /api/v1/multitodo/edittodo Edit a list
  * 
  * @apiParam {boolean} isCompleted completed of the list. (body params) (required)
  * @apiParam {string} changed changed title  of the list. (body params) (required)
  * @apiParam {string} remarks remarks of history of the list. (body params) (required) 
  * @apiParam {string} trnId trnId transacton of the list. (body params) (required)
  * @apiParam {string} multiToDoId multiToDoId of the list. (body params) (required)
  * @apiParam {string} title title of the list. (body params) (required)
  * @apiParam {string} createdBy createdBy of the list. (body params) (required)
  * @apiParam {string} editBy editBy of the list. (body params) (required)
  * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
  *
  * @apiSuccessExample {object} Success-Response:
  *  {
         "error": false,
         "message": "save the history successfully",
         "status": 200,
         "data": {        
                   "isCompleted":boolean,
                   "changed":string
                   "remarks": string,
                   "createdOn":date,
                   "trnId":string,
                   "multiToDoId":string,
                   "oldTitle":string,
                   "createdBy":string,
                   "editBy":string
    
                 }
     }
   * @apiSuccessExample {object} Success-Response:
      {
         "error": false,
         "message": "List created successfully",
         "status": 200,
         "data": {        
                    "isCompleted":boolean,
                    "createdOn":date,
                    "multiToDoId":string,
                    "title":string,
                    "createdBy": string 
                 }
     }
     
     @apiErrorExample {json} Error-Response:
 *
 * {
   "error": true,
   "message": "Failed to update List",
   "status": 500,
   "data": null
  }
 */


  app.put(`${baseUrl}/completetodo`, auth.isAuthorize, multiTodoController.completeToDo);
  /**
* @apiGroup MultiUser
* @apiVersion  1.0.0
* @api {put} /api/v1/multitodo/completetodo Complete a list

* @apiParam {boolean} isCompleted completed of the list. (body params) (required)
* @apiParam {string} multiToDoId multiToDoId of the list. (body params) (required)
* @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
*
  * @apiSuccessExample {object} Success-Response:
    {
       "error": false,
       "message": "List updated successfully",
       "status": 200,
       "data": {        
                  "isCompleted":boolean,
                  "createdOn":date,
                  "multiToDoId":string,
                  "title":string,
                  "createdBy": string 
               }
   }
   
   @apiErrorExample {json} Error-Response:
*
* {
 "error": true,
 "message": "Failed to update List",
 "status": 500,
 "data": null
}
*/

  app.get(`${baseUrl}/gethistory`, auth.isAuthorize, multiTodoController.getToDoTransactionById)
  /**
* @apiGroup MultiUser
* @apiVersion  1.0.0
* @api {get} /api/v1/multitodo/gethistory      Get all History of list

* @apiParam {string} multiToDoId multiToDoId of the list. (route params) (required)
* @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
*
* @apiSuccessExample {object} Success-Response:
    {
       "error": false,
       "message": "All list history fetch successfully",
       "status": 200,
       "data": 
         {  countHistory: 1, 
           transcList: [ 
             { "isCompleted":boolean,
                  "changed":string
                  "remarks": string,
                  "createdOn":date,
                  "trnId":string,
                  "multiToDoId":string,
                  "oldTitle":string,
                  "createdBy":string,
                  "editBy":string 
                 }
               ] 
         }
    }
   
   @apiErrorExample {json} Error-Response:
*
* {
 "error": true,
 "message": "Failed to fetch List history",
 "status": 500,
 "data": null
}
*/
  app.post(`${baseUrl}/undoTodo/:multiToDoId/:multitrnId`, auth.isAuthorize, multiTodoController.undoTodo);
  /**
   * @apiGroup MultiUser
   * @apiVersion  1.0.0
   * @api {post} /api/v1/multitodo/undoTodo/:multiToDoId/:multitrnId Undo action on list
   * 
   * @apiParam {boolean} isCompleted completed of the list. (body params) (required)
   * @apiParam {string} changed changed title  of the list. (body params) (required)
   * @apiParam {string} remarks remarks of history of the list. (body params) (required) 
   * @apiParam {string} trnId trnId transacton of the list. (route params) (required)
   * @apiParam {string} multiToDoId multiToDoId of the list. (route params) (required)
   * @apiParam {string} title title of the list. (body params) (required)
   * @apiParam {string} createdBy createdBy of the list. (body params) (required)
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} editBy editBy of the list. (body params) (required)
   *
   * @apiSuccessExample {object} Success-Response:
   *  {
          "error": false,
          "message": "fetch the history successfully",
          "status": 200,
          "data": {        
                    "isCompleted":boolean,
                    "changed":string
                    "remarks": string,
                    "createdOn":date,
                    "trnId":string,
                    "multiToDoId":string,
                    "oldTitle":string,
                    "createdBy":string,
                    "editBy":string
     
                  }
      }
    * @apiSuccessExample {object} Success-Response:
       {
          "error": false,
          "message": "List updated successfully",
          "status": 200,
          "data": {        
                     "isCompleted":boolean,
                     "createdOn":date,
                     "multiToDoId":string,
                     "title":string,
                     "createdBy": string 
                  }
      }
      
      @apiErrorExample {json} Error-Response:
  *
  * {
    "error": true,
    "message": "Failed to update List",
    "status": 500,
    "data": null
   }
  */





}