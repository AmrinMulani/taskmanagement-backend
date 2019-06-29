const express = require("express");
const router = express.Router();
const singleTodoController = require("../controllers/singleTodoController");
const appConfig = require("../../config/appConfig");
const auth = require("../middlewares/auth");

module.exports.setRouter = app => {
   let baseUrl = `${appConfig.apiVersion}/todo`;

   // defining routes.
   //create parent list
   app.post(`${baseUrl}/createtodo`, auth.isAuthorize, singleTodoController.createTodoList);
   /**
    * @apiGroup List
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/createtodo Create a list
    * 
    * @apiParam {string} listId listId of the list. (body params) (required)
    * @apiParam {string} title title of the list. (body params) (required)
    * @apiParam {string} createdBy createdBy of the list. (body params) (required)
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required) 
    *
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "List created successfully",
           "status": 200,
           "data": {        
                     "isComplete": boolean,
                     "itemTodo": [],       
                     "listId":string,
                     "title": string,
                     "createdBy":string,
                     "createdOn":date 
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
   //get all parent list by using userId  
   app.get(`${baseUrl}/allList/:userId`, auth.isAuthorize, singleTodoController.findAllList);
   /**
        * @apiGroup List
        * @apiVersion  1.0.0
        * @api {get} /api/v1/todo/allList/:userId Get all list.
        * 
        * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
        * @apiParam {string} userId userId of the list. (route params) (required)
        * 
        * @apiSuccessExample {object} Success-Response:
            {
               "error": false,
               "message": "All List is fetch successfully",
               "status": 200,
               "data": [
                        "isComplete": boolean,
                        "itemTodo": [],
                        "listId":string,
                        "title": string,
                        "createdBy":string,
                        "createdOn":date 
               ]
           }
           @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "No Lists Found",
         "status": 500,
         "data": null
        }
       */
   //update the list 
   app.put(`${baseUrl}/uplisttodo`, auth.isAuthorize, singleTodoController.editTodoList);
   /**
    * @apiGroup List
    * @apiVersion  1.0.0
    * @api {put} /api/v1/todo/uplisttodo Edit a list.
    * 
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} listId listId of the list. (body params) (required)
    * @apiParam {string} title title of the list. (body params) (required)
    * @apiParam {string} createdBy createdBy userId of the list. (body params) (required)
    * @apiParam {boolean} isCompleted complete the list. (body params) (required)
    *
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "List updated successfully",
           "status": 200,
           "data": {        
                     "isComplete": boolean,
                     "itemTodo": [],       
                     "listId":string,
                     "title": string,
                     "createdBy":string,
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

   //delete the list by listId 
   app.post(`${baseUrl}/deletelist/:listId`, auth.isAuthorize, singleTodoController.deleteTodoList);
   /**
       * @apiGroup List
       * @apiVersion  1.0.0
       * @api {post} /api/v1/todo/deletelist/:listId Delete a list by listId.
       * 
       * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
       * @apiParam {string} listId listId of the list. (route params) (required)
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


   //create the task by using listId
   app.post(`${baseUrl}/createItem`, auth.isAuthorize, singleTodoController.createItemTodo);

   /**
      * @apiGroup List
      * @apiVersion  1.0.0
      * @api {post} /api/v1/todo/createItem Create a task of list
      *
      * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
      * @apiParam {string} listId listId of the parent list. (body params) (required)
      * @apiParam {string} taskId taskId of the task. (body params) (required)
      * @apiParam {string} title title of the list. (body params) (required)
      * @apiParam {string} createdBy createdBy of the list. (body params) (required)
      *
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "List created successfully",
             "status": 200,
             "data": {        
                       "isComplete": boolean,
                       "subitemTodo": [], 
                       "taskId":string,      
                       "listId":string,
                       "title": string,
                       "createdBy":string,
                       "createdOn":date 
                     }
         }
         @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Failed to create a new Task",
       "status": 500,
       "data": null
      }
   */

   //get the task list using list id and user id 
   app.get(`${baseUrl}/gettask/:listId/:userId`, auth.isAuthorize, singleTodoController.getToDoItemListId)
   /**
        * @apiGroup List
        * @apiVersion  1.0.0
        * @api {get} /api/v1/todo/gettask/:listId/:userId Get all task .
        * 
        * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
        * @apiParam {string} userId userId of the list. (route params) (required)
        * @apiParam {string} listId listId of the parent list. (route params) (required)       * 
        * 
        * @apiSuccessExample {object} Success-Response:
            {
               "error": false,
               "message": "All List is fetch successfully",
               "status": 200,
               "data":
                 {
                        isComplete: false,
                        itemTodo: [ 
                                      "isComplete": boolean,     
                                      "subitemTodo": [],
                                      "taskId": string,
                                      "title": 'string,
                                      "createdBy": string,
                                      "listId": string,
                                      "createdOn": date
                                   ],
                        "listId": string,
                        "title": string,
                        "createdBy": string,
                        "createdOn": date
                 }
             }
           @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "No Tasks Found",
         "status": 500,
         "data": null
        }
       */
   //update the task
   app.put(`${baseUrl}/uptasktodo`, auth.isAuthorize, singleTodoController.updateTaskToDo);
   /**
        * @apiGroup List
        * @apiVersion  1.0.0
        * @api {put} /api/v1/todo/uptasktodo Edit a task.
        * 
        * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
        * @apiParam {string} listId listId of the parent list. (body params) (required)
        * @apiParam {string} taskId taskId of the task. (body params) (required)
        * @apiParam {string} title title of the list. (body params) (required)
        * @apiParam {string} createdBy createdBy of the list. (body params) (required)
        *
        * @apiSuccessExample {object} Success-Response:
            {
               "error": false,
               "message": "Task is updated successfully",
               "status": 200,
               "data": {        
                         "isComplete": boolean,
                         "subitemTodo": [], 
                         "taskId":string,      
                         "listId":string,
                         "title": string,
                         "createdBy":string,
                         "createdOn":date 
                       }
           }
           @apiErrorExample {json} Error-Response:
      *
      * {
         "error": true,
         "message": "Failed to update a Task",
         "status": 500,
         "data": null
        }
     */
   //delete task 
   app.post(`${baseUrl}/delitemtodo`, auth.isAuthorize, singleTodoController.deleteTodoTask)
   /**
        * @apiGroup List
        * @apiVersion  1.0.0
        * @api {post} /api/v1/todo/delitemtodo Delete a task  by taskId.
        *
        * @apiParam {string} taskId taskId of the list. (body params) (required)
        * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
        * 
        * @apiSuccessExample {object} Success-Response:
            {
               "error": false,
               "message": "Task Deleted Successfully",
               "status": 200,
               "data": null
           }
           @apiErrorExample {json} Error-Response:
      *
      * {c
         "error": true,
         "message": "Failed to delete a Task ",
         "status": 500,
         "data": null
        }
       */

   //createsubitem 
   app.post(`${baseUrl}/createsubitem`, auth.isAuthorize, singleTodoController.createSubItem);
   /**
      * @apiGroup List
      * @apiVersion  1.0.0
      * @api {post} /api/v1/todo/createsubitem Create a subtask of task
      *
      * @apiParam {string} listId listId of the parent list. (body params) (required)
      * @apiParam {string} taskId taskId of the task. (body params) (required)
      * @apiParam {string} subTaskId subTaskId of the task. (body params) (required)
      * @apiParam {string} title title of the list. (body params) (required)
      * @apiParam {string} createdBy createdBy of the list. (body params) (required)
      * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
      *
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Sub Task created successfully",
             "status": 200,
             "data": {        
                       "isComplete": boolean,
                       "subTaskId":string 
                       "taskId":string,      
                       "listId":string,
                       "title": string,
                       "createdBy":string,
                       "createdOn":date 
                     }
         }
         @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Failed to create a new Sub Task",
       "status": 500,
       "data": null
      }
   */

   //get all subTask 
   app.get(`${baseUrl}/getsubitem/:taskId/:userId`, auth.isAuthorize, singleTodoController.getSubItemByParentId)
   /**
         * @apiGroup List
         * @apiVersion  1.0.0
         * @api {get} /api/v1/todo/getsubitem/:taskId/:userId` Get all sub task .
         * 
         * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
         * @apiParam {string} userId userId of the list. (route params) (required)
         * @apiParam {string} taskId taskId of the parent list. (route params) (required) 
         * @apiSuccessExample {object} Success-Response:
             {
                "error": false,
                "message": "All Task is found successfully",
                "status": 200,
                "data":
                  {
                         isComplete: false,
                         subitemTodo: [ 
                                       "isComplete": boolean,     
                                       "taskId": string,
                                       "subTaskId": string,
                                       "title": 'string,
                                       "createdBy": string,
                                       "listId": string,
                                       "createdOn": date
                                    ],
                         "listId": string,
                         "taskId": string,
                         "title": string,
                         "createdBy": string,
                         "createdOn": date
                  }
              }
            @apiErrorExample {json} Error-Response:
       *
       * {
          "error": true,
          "message": "No Tasks Found",
          "status": 500,
          "data": null
         }
        */

   app.post(`${baseUrl}/delsubitemtodo`, auth.isAuthorize, singleTodoController.deleteTodoSubTask)
   /**
      * @apiGroup List
      * @apiVersion  1.0.0
      * @api {post} /api/v1/todo/delsubitemtodo Delete a sub task by subTaskId.
      *
      * @apiParam {string} subTaskId subTaskId of the list. (body params) (required)
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




   app.post(`${baseUrl}/updsubitemtodo`, auth.isAuthorize, singleTodoController.updateSubItemToDo);
   /**
      * @apiGroup List
      * @apiVersion  1.0.0
      * @api {post} /api/v1/todo/updsubitemtodo Edit a sub task.
      * 
      * @apiParam {string} listId listId of the parent list. (body params) (required)
      * @apiParam {string} taskId taskId of the task. (body params) (required)
      * @apiParam {string} subTaskId subTaskId of the task. (body params) (required)
      * @apiParam {string} title title of the list. (body params) (required)
      * @apiParam {string} createdBy createdBy of the list. (body params) (required)
      * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
      *
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Sub Task updated successfully",
             "status": 200,
             "data": {        
                       "isComplete": boolean,
                       "subTaskId":string 
                       "taskId":string,      
                       "listId":string,
                       "title": string,
                       "createdBy":string,
                       "createdOn":date 
                     }
         }
         @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "Failed to update a new Sub Task",
       "status": 500,
       "data": null
      }
   */
   //app.put(`${baseUrl}/uplisttodo`, auth.isAuthorize, singleTodoController.editTodoList);
   //app.get(`${baseUrl}/listname/:listId`, singleTodoController.findList);

};
