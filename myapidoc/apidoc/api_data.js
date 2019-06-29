define({ "api": [
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/allList/:userId",
    "title": "Get all list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the list. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All List is fetch successfully\",\n    \"status\": 200,\n    \"data\": [\n             \"isComplete\": boolean,\n             \"itemTodo\": [],\n             \"listId\":string,\n             \"title\": string,\n             \"createdBy\":string,\n             \"createdOn\":date \n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"No Lists Found\",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "GetApiV1TodoAlllistUserid"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/getsubitem/:taskId/:userId`",
    "title": "Get all sub task .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the parent list. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Task is found successfully\",\n   \"status\": 200,\n   \"data\":\n     {\n            isComplete: false,\n            subitemTodo: [ \n                          \"isComplete\": boolean,     \n                          \"taskId\": string,\n                          \"subTaskId\": string,\n                          \"title\": 'string,\n                          \"createdBy\": string,\n                          \"listId\": string,\n                          \"createdOn\": date\n                       ],\n            \"listId\": string,\n            \"taskId\": string,\n            \"title\": string,\n            \"createdBy\": string,\n            \"createdOn\": date\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n          \"error\": true,\n          \"message\": \"No Tasks Found\",\n          \"status\": 500,\n          \"data\": null\n         }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "GetApiV1TodoGetsubitemTaskidUserid"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/gettask/:listId/:userId",
    "title": "Get all task .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the parent list. (route params) (required)       *</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All List is fetch successfully\",\n   \"status\": 200,\n   \"data\":\n     {\n            isComplete: false,\n            itemTodo: [ \n                          \"isComplete\": boolean,     \n                          \"subitemTodo\": [],\n                          \"taskId\": string,\n                          \"title\": 'string,\n                          \"createdBy\": string,\n                          \"listId\": string,\n                          \"createdOn\": date\n                       ],\n            \"listId\": string,\n            \"title\": string,\n            \"createdBy\": string,\n            \"createdOn\": date\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"No Tasks Found\",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "GetApiV1TodoGettaskListidUserid"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/createItem",
    "title": "Create a task of list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the parent list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List created successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"subitemTodo\": [], \n              \"taskId\":string,      \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n              \"createdOn\":date \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n       \"error\": true,\n       \"message\": \"Failed to create a new Task\",\n       \"status\": 500,\n       \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoCreateitem"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/createsubitem",
    "title": "Create a subtask of task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the parent list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sub Task created successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"subTaskId\":string \n              \"taskId\":string,      \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n              \"createdOn\":date \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n       \"error\": true,\n       \"message\": \"Failed to create a new Sub Task\",\n       \"status\": 500,\n       \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoCreatesubitem"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/createtodo",
    "title": "Create a list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List created successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"itemTodo\": [],       \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n              \"createdOn\":date \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n     \"error\": true,\n     \"message\": \"Failed to create a new List\",\n     \"status\": 500,\n     \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoCreatetodo"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/deletelist/:listId",
    "title": "Delete a list by listId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List deleted successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Failed to delete a list\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoDeletelistListid"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/delitemtodo",
    "title": "Delete a task  by taskId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Task Deleted Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{c\n         \"error\": true,\n         \"message\": \"Failed to delete a Task \",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoDelitemtodo"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/delsubitemtodo",
    "title": "Delete a sub task by subTaskId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List deleted successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n       \"error\": true,\n       \"message\": \"Failed to delete a list\",\n       \"status\": 500,\n       \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoDelsubitemtodo"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/updsubitemtodo",
    "title": "Edit a sub task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the parent list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>subTaskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sub Task updated successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"subTaskId\":string \n              \"taskId\":string,      \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n              \"createdOn\":date \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n       \"error\": true,\n       \"message\": \"Failed to update a new Sub Task\",\n       \"status\": 500,\n       \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PostApiV1TodoUpdsubitemtodo"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/todo/uplisttodo",
    "title": "Edit a list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy userId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>complete the list. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List updated successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"itemTodo\": [],       \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n     \"error\": true,\n     \"message\": \"Failed to update List\",\n     \"status\": 500,\n     \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PutApiV1TodoUplisttodo"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/todo/uptasktodo",
    "title": "Edit a task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the parent list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>taskId of the task. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Task is updated successfully\",\n    \"status\": 200,\n    \"data\": {        \n              \"isComplete\": boolean,\n              \"subitemTodo\": [], \n              \"taskId\":string,      \n              \"listId\":string,\n              \"title\": string,\n              \"createdBy\":string,\n              \"createdOn\":date \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"Failed to update a Task\",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/singletodo.js",
    "groupTitle": "List",
    "name": "PutApiV1TodoUptasktodo"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/multitodo/alltodo/:userId",
    "title": "Get all list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All list fetch successfully\",\n    \"status\": 200,\n    \"data\": [\n      {        \n               \"isCompleted\":boolean,\n               \"createdOn\":date,\n               \"multiToDoId\":string,\n               \"title\":string,\n               \"createdBy\": string \n      }\n     ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed to create a new List\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "GetApiV1MultitodoAlltodoUserid"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/multitodo/gethistory",
    "title": "Get all History of list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDoId",
            "description": "<p>multiToDoId of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All list history fetch successfully\",\n   \"status\": 200,\n   \"data\": \n     {  countHistory: 1, \n       transcList: [ \n         { \"isCompleted\":boolean,\n              \"changed\":string\n              \"remarks\": string,\n              \"createdOn\":date,\n              \"trnId\":string,\n              \"multiToDoId\":string,\n              \"oldTitle\":string,\n              \"createdBy\":string,\n              \"editBy\":string \n             }\n           ] \n     }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n \"error\": true,\n \"message\": \"Failed to fetch List history\",\n \"status\": 500,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "GetApiV1MultitodoGethistory"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/multitodo/createtodo",
    "title": "Create a list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>completed of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "changed",
            "description": "<p>changed title  of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remarks",
            "description": "<p>remarks of history of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trnId",
            "description": "<p>trnId transacton of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDoId",
            "description": "<p>multiToDoId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "editBy",
            "description": "<p>editBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"save the history successfully\",\n        \"status\": 200,\n        \"data\": {        \n                  \"isCompleted\":boolean,\n                  \"changed\":string\n                  \"remarks\": string,\n                  \"createdOn\":date,\n                  \"trnId\":string,\n                  \"multiToDoId\":string,\n                  \"oldTitle\":string,\n                  \"createdBy\":string,\n                  \"editBy\":string\n   \n                }\n    }",
          "type": "object"
        },
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List created successfully\",\n    \"status\": 200,\n    \"data\": {        \n               \"isCompleted\":boolean,\n               \"createdOn\":date,\n               \"multiToDoId\":string,\n               \"title\":string,\n               \"createdBy\": string \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n   \"error\": true,\n   \"message\": \"Failed to create a new List\",\n   \"status\": 500,\n   \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "PostApiV1MultitodoCreatetodo"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/multitodo/deletetodo/:multiToDoId",
    "title": "Delete a list by multiToDoId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDotId",
            "description": "<p>multiToDoId of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List deleted successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n       \"error\": true,\n       \"message\": \"Failed to delete a list\",\n       \"status\": 500,\n       \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "PostApiV1MultitodoDeletetodoMultitodoid"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/multitodo/undoTodo/:multiToDoId/:multitrnId",
    "title": "Undo action on list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>completed of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "changed",
            "description": "<p>changed title  of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remarks",
            "description": "<p>remarks of history of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trnId",
            "description": "<p>trnId transacton of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDoId",
            "description": "<p>multiToDoId of the list. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "editBy",
            "description": "<p>editBy of the list. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n         \"error\": false,\n         \"message\": \"fetch the history successfully\",\n         \"status\": 200,\n         \"data\": {        \n                   \"isCompleted\":boolean,\n                   \"changed\":string\n                   \"remarks\": string,\n                   \"createdOn\":date,\n                   \"trnId\":string,\n                   \"multiToDoId\":string,\n                   \"oldTitle\":string,\n                   \"createdBy\":string,\n                   \"editBy\":string\n    \n                 }\n     }",
          "type": "object"
        },
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List updated successfully\",\n    \"status\": 200,\n    \"data\": {        \n               \"isCompleted\":boolean,\n               \"createdOn\":date,\n               \"multiToDoId\":string,\n               \"title\":string,\n               \"createdBy\": string \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to update List\",\n    \"status\": 500,\n    \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "PostApiV1MultitodoUndotodoMultitodoidMultitrnid"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/multitodo/completetodo",
    "title": "Complete a list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>completed of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDoId",
            "description": "<p>multiToDoId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List updated successfully\",\n    \"status\": 200,\n    \"data\": {        \n               \"isCompleted\":boolean,\n               \"createdOn\":date,\n               \"multiToDoId\":string,\n               \"title\":string,\n               \"createdBy\": string \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n \"error\": true,\n \"message\": \"Failed to update List\",\n \"status\": 500,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "PutApiV1MultitodoCompletetodo"
  },
  {
    "group": "MultiUser",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/multitodo/edittodo",
    "title": "Edit a list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isCompleted",
            "description": "<p>completed of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "changed",
            "description": "<p>changed title  of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remarks",
            "description": "<p>remarks of history of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trnId",
            "description": "<p>trnId transacton of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "multiToDoId",
            "description": "<p>multiToDoId of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>createdBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "editBy",
            "description": "<p>editBy of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"save the history successfully\",\n        \"status\": 200,\n        \"data\": {        \n                  \"isCompleted\":boolean,\n                  \"changed\":string\n                  \"remarks\": string,\n                  \"createdOn\":date,\n                  \"trnId\":string,\n                  \"multiToDoId\":string,\n                  \"oldTitle\":string,\n                  \"createdBy\":string,\n                  \"editBy\":string\n   \n                }\n    }",
          "type": "object"
        },
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"List created successfully\",\n    \"status\": 200,\n    \"data\": {        \n               \"isCompleted\":boolean,\n               \"createdOn\":date,\n               \"multiToDoId\":string,\n               \"title\":string,\n               \"createdBy\": string \n            }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n   \"error\": true,\n   \"message\": \"Failed to update List\",\n   \"status\": 500,\n   \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/multiTodo.js",
    "groupTitle": "MultiUser",
    "name": "PutApiV1MultitodoEdittodo"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotpassword",
    "title": "User forgotpassword.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Email sent successful!!\",\n    \"status\": 200,\n    \"data\": null\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Failed to Email send \",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "User Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login successful!!\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": string,\n        \"userDetails\": {\n            \"userId\":string,\n            \"email\": string\n            \"firstName\": string,\n            \"lastName\": string,\n            \"fullName\": string,\n            \"country\" : string,\n            \"countryCode\" : string,\n            \"mobileNumber\" : number,\n            \"friends\": [],\n            \"friendRequestSent\": [],\n            \"friendRequestRecieved\": []\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"Login failed\",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "User logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged out successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n     \"error\": true,\n     \"message\": \"Failed\",\n     \"status\": 500,\n     \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetpassword",
    "title": "User resetpassword.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Password reset successfully\",\n    \"status\": 200,\n    \"data\": null\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"Failed to reset password \",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "User SignUp.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email address of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>full Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Signed up successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\":string,\n        \"email\": string\n        \"firstName\": string,\n        \"lastName\": string,\n        \"fullName\": string,\n        \"country\" : string,\n        \"countryCode\" : string,\n        \"mobileNumber\" : number,\n        \"friends\": [],\n        \"friendRequestSent\": [],\n        \"friendRequestRecieved\": [],\n        \"createdOn\": date,\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n         \"error\": true,\n         \"message\": \"Failed to create new user\",\n         \"status\": 500,\n         \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/accept/friend/request",
    "title": "Accept Friend Request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>Name of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverId",
            "description": "<p>Id of the Reciever(Login User). (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverName",
            "description": "<p>Name of the Reciever(Login User). (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Accepted Friend Request\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRelation.js",
    "groupTitle": "friends",
    "name": "GetApiV1FriendrequestAcceptFriendRequest"
  },
  {
    "group": "friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/send/friend/request",
    "title": "Send Friend Request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>Name of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverId",
            "description": "<p>Id of the Reciever. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverName",
            "description": "<p>Name of the Reciever. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend Request Sent\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRelation.js",
    "groupTitle": "friends",
    "name": "GetApiV1FriendrequestSendFriendRequest"
  },
  {
    "group": "friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/viewfriend/request/recieved/:userId",
    "title": "Get all friends request Recieved.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UserId",
            "description": "<p>Id of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Recieved Requsts Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": ObjectId,\n            \"friendRequestRecieved\": [\n                {\n                    \"friendId\": string\n                    \"friendName\": string\n                    \"_id\": objectId\n                }\n            ]\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRelation.js",
    "groupTitle": "friends",
    "name": "GetApiV1FriendrequestViewfriendRequestRecievedUserid"
  },
  {
    "group": "friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/viewfriend/request/sent/:userId",
    "title": "Get all friends request sent.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Sent Requsts Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": ObjectId\n            \"friendRequestSent\": [\n                {\n                    \"friendId\":string,\n                    \"friendName\":string,\n                    \"_id\": ObjectId\n                }\n            ]\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRelation.js",
    "groupTitle": "friends",
    "name": "GetApiV1FriendrequestViewfriendRequestSentUserid"
  },
  {
    "group": "friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendRequest/viewfriend/view/friends/:userId",
    "title": "Get all friends request Recieved.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UserId",
            "description": "<p>Id of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Friend list Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": ObjectId,\n            \"friends\": [\n                {\n                    \"friendId\": string\n                    \"friendName\": string\n                    \"_id\": objectId\n                }\n            ]\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friendRelation.js",
    "groupTitle": "friends",
    "name": "GetApiV1FriendrequestViewfriendViewFriendsUserid"
  }
] });
