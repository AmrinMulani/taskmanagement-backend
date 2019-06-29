const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("../libs/timeLib");
const response = require("../libs/responseLib");
const logger = require("../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const passwordLib = require("../libs/passwordLib");
const tokenLib = require("../libs/tokenLib");
//const emailLib = require("../libs/emailLib");

/* Models */

const ListModel = mongoose.model("List")
const TaskModel = mongoose.model("Task")
const SubTaskModel = mongoose.model("SubTask")
const titleCase = require("title-case");

let createTodoList = (req, res) => {
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.title)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: createTodoList()", 10);
          let apiResponse = response.generate(true, "createdBy field is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title of list is missing in the request", "singleTodoController: createTodoList()", 10);
        let apiResponse = response.generate(true, "title of list is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters
  let saveToDoList = () => {
    return new Promise((resolve, reject) => {
      ListModel.findOne({ title: req.body.title.trim(), createdBy: req.body.createdBy }).exec(
        (err, listToDo) => {
          if (err) {
            logger.error(err.message, "singleTodoController: saveToDoList()", 10);
            let apiResponse = response.generate(true, "Failed to create todo " + err, 400, null);
            reject(apiResponse);
          } else if (!check.isEmpty(listToDo)) {
            logger.error("Title already exist", "singleTodoController: saveToDoList()", 7);
            let apiResponse = response.generate(true, "Title already exists", 400, null);
            reject(apiResponse);
          } else {
            let listObject = new ListModel({
              listId: shortid.generate(),
              title: req.body.title.trim(),
              createdBy: req.body.createdBy,
              itemTodo: [],
              createdOn: time.now()
            });

            listObject.save((err, generatedToDo) => {
              if (err) {
                logger.error(err.message, "singleTodoController: saveToDoList()", 10);
                let apiResponse = response.generate(true, "Unable to create new todo List", 400, null);
                reject(apiResponse);
              } else {
                let generatedToDoObject = generatedToDo.toObject();
                resolve(generatedToDoObject);
              }
            });
          }
        }
      );
    });
  }; //end of saveToDoParent
  validateParameters(req, res)
    .then(saveToDoList)
    .then(resolve => {
      let apiResponse = response.generate(false, "ToDo Created Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
}; //end of createToDoListFucntion

let findAllList = (req, res) => {
  let getList = () => {
    return new Promise((resolve, reject) => {
      ListModel.find({ 'createdBy': req.params.userId })
        .select("-_id -_v")
        .sort("-createOn")
        .lean()
        .exec((err, result) => {
          if (err) {
            let apiResponse = response.generate(true, " Unable to Fetch the list ", 400, null);
            reject(apiResponse);
          } else if (check.isEmpty(result)) {
            logger.error("No todo created yet", "singleTodoController: findAllList()", 10);
            let apiResponse = response.generate(true, " No todo added yet  ", 400, null);
            reject(apiResponse);
          } else {
            resolve(result);
          }
        });
    });
  };
  getList(req, res)
    .then(list => {
      let apiResponse = response.generate(false, " List is fetch successfully  ", 200, list);
      res.send(apiResponse);
    })
    .catch(err => {
      let apiResponse = response.generate(false, err.message, 500, null);
      res.send(apiResponse);
    });
};

let deleteTodoList = (req, res) => {
  if (check.isEmpty(req.params.listId)) {
    console.log("List id  should be passed");
    let apiResponse = response.generate(true, "list id is missing", 403, null);
    res.send(apiResponse);
  } else {
    SubTaskModel.remove({ listId: req.params.listId }, (err, result) => {
      if (err) {
        console.log("error");
      } else {
        TaskModel.remove({ listId: req.params.listId }, (err, result) => {
          if (err) {
            console.log("error");
          }
          else {
            ListModel.remove({ listId: req.params.listId }, (err, result) => {

              if (err) {
                console.log("Error Occured.");
                logger.error(`Error Occured : ${err}`, "Database", 10);
                let apiResponse = response.generate(true, "Error Occured.", 500, null);
                res.send(apiResponse);
              } else if (check.isEmpty(result)) {
                console.log("list Not Found.");
                let apiResponse = response.generate(true, "list Not Found.", 404, null);
                res.send(apiResponse);
              } else {
                console.log("list Deletion Success");
                let apiResponse = response.generate(false, "list Deleted Successfully", 200, result);
                res.send(apiResponse);
              }
            });
          }
        });
      }
    });
  }
};//Delete List function

//edit List function 
let editTodoList = (req, res) => {
  let options = req.body
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.title)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: editTodoList()", 10);
          let apiResponse = response.generate(true, "createdBy field is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title of list is missing in the request", "singleTodoController: editTodoList()", 10);
        let apiResponse = response.generate(true, "title of list is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters
  let saveToDoList = () => {
    return new Promise((resolve, reject) => {

      ListModel.update({ "listId": req.body.listId }, options, { multi: true }
        , function (err, generatedToDo) {
          console.log(generatedToDo)

          if (err) {
            //console.log(err)
            logger.error(err.message, "singleTodoController: saveToDoList()", 10);
            let apiResponse = response.generate(true, "Unable to update   todo List", 400, null);
            reject(apiResponse);
          } else {
            resolve(generatedToDo)
          }
        });
    }
    );
  }; //end of saveToDoParent

  validateParameters(req, res)
    .then(saveToDoList)
    .then(resolve => {
      let apiResponse = response.generate(false, "ToDo updated Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
}; //end of Edit ToDoListFucntion

//create task field 
let createItemTodo = (req, res) => {
  console.log("list id" + req.body.listId);
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.listId)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: createItemTodo()", 10);
          let apiResponse = response.generate(true, "createdBy is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title is missing in the request", "singleTodoController: createItemTodo()", 10);
        let apiResponse = response.generate(true, "list id is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters

  //start of saveToDoParent
  let saveToDoParent = () => {
    return new Promise((resolve, reject) => {
      TaskModel.findOne({ title: req.body.title.trim() }).exec(
        (err, parentToDo) => {
          if (err) {
            logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
            let apiResponse = response.generate(true, "Failed to create todo", 400, null);
            reject(apiResponse);
          } else if (!check.isEmpty(parentToDo)) {
            logger.error("Title already exist", "singleTodoController: saveToDoParent()", 7);
            let apiResponse = response.generate(true, "Title already exists", 400, null);
            reject(apiResponse);
          } else {
            ListModel.findOne({ listId: req.body.listId }).exec((err, result) => {
              if (err) {
                logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
                let apiResponse = response.generate(true, "Failed to create todo", 400, null);
                reject(apiResponse);
              } else if (!check.isEmpty(result)) {

                let taskObj = new TaskModel({
                  taskId: shortid.generate(),
                  title: titleCase(req.body.title.trim()),
                  createdBy: req.body.createdBy,
                  listId: req.body.listId,
                  subItemTodo: [],
                  createdOn: time.now()
                });

                taskObj.save((err, generatedToDo) => {
                  if (err) {
                    //console.log(err)
                    logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
                    let apiResponse = response.generate(true, "Unable to create new todo item", 400, null);
                    reject(apiResponse);
                  } else {

                    let generatedToDoObject = generatedToDo.toObject();
                    resolve(generatedToDoObject);
                    console.log(generatedToDo.taskId)
                    ListModel.findOneAndUpdate({ "listId": req.body.listId },
                      { $push: { itemTodo: generatedToDo } },
                      { "upsert": true, "new": true },
                      function (error, success) {
                        console.log("List save ")
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(success);
                        }
                      });
                  }
                });
              }
            });
          }
        }
      );
    });
  }; //end of saveToDoParent

  /*
         Function Calls
    */
  validateParameters(req, res)
    .then(saveToDoParent)
    .then(resolve => {
      let apiResponse = response.generate(false, "Sub ToDo Created Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
}; //end of saveitemNew Function


//task list
let getToDoItemListId = (req, res) => {

  //start of validateParameters, to check parameters and validate data
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.listId)) {
        logger.error('parentId is missing in the request', 'singleTodoController: getToDoItemListId()', 10);
        let apiResponse = response.generate(true, 'parentId is required', 400, null);
        reject(apiResponse);
      } else {
        ListModel.findOne({ 'listId': req.params.listId, 'createdBy': req.params.userId })
          .populate('itemTodo')
          .lean()
          .exec((err, result) => {
            if (err) {
              logger.error(err.message, 'singleTodoController: getToDoItemListId()', 10);
              let apiResponse = response.generate(true, 'Failed to fetch todo parent data ' + err, 400, null);
              reject(apiResponse);
            } else if (check.isEmpty(result)) {
              logger.error('Failed to find parent details', 'singleTodoController: getToDoItemListId()', 10);
              let apiResponse = response.generate(true, 'Failed to find parent details, Check parent id', 400, null);
              reject(apiResponse);
            } else {
              resolve(result);
            }
          })
      }
    }); //end of return promise
  }
  validateParameters(req, res)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'to do list found successfully', 200, resolve)
      res.status(200)
      res.send(apiResponse)
    })
    .catch((err) => {
      //console.log("errorhandler");
      //console.log(err);
      res.status(err.status)
      res.send(err)
    })
}; //end of getToDoItemListByParentIdFunction

//create sub task
let createSubItem = (req, res) => {
  console.log("list id" + req.body.listId);
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.listId)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: createSubItem()", 10);
          let apiResponse = response.generate(true, "createdBy is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title is missing in the request", "singleTodoController: createSubItem()", 10);
        let apiResponse = response.generate(true, "list id is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters

  //start of saveToDoParent
  let saveToDoParent = () => {
    return new Promise((resolve, reject) => {
      SubTaskModel.findOne({ title: req.body.title.trim() }).exec(
        (err, parentToDo) => {
          if (err) {
            logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
            let apiResponse = response.generate(true, "Failed to create todo", 400, null);
            reject(apiResponse);
          } else if (!check.isEmpty(parentToDo)) {
            logger.error("Title already exist", "singleTodoController: saveToDoParent()", 7);
            let apiResponse = response.generate(true, "Title already exists", 400, null);
            reject(apiResponse);
          } else {
            TaskModel.findOne({
              listId: req.body.listId, taskId: req.body.taskId
            }).exec((err, result) => {
              console.log("I am result" + result)
              if (err) {
                logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
                let apiResponse = response.generate(true, "Failed to create todo", 400, null);
                reject(apiResponse);
              } else if (!check.isEmpty(result)) {

                let subTaskObj = new SubTaskModel({
                  subTaskId: shortid.generate(),
                  title: titleCase(req.body.title.trim()),
                  createdBy: req.body.createdBy,
                  listId: req.body.listId,
                  taskId: req.body.taskId,
                  createdOn: time.now()
                });

                subTaskObj.save((err, generatedToDo) => {
                  if (err) {
                    console.log(err)
                    logger.error(err.message, "singleTodoController: saveToDoParent()", 10);
                    let apiResponse = response.generate(true, "Unable to create new sub todo item", 400, null);
                    reject(apiResponse);
                  } else {
                    let generatedToDoObject = generatedToDo.toObject();
                    resolve(generatedToDoObject);
                    TaskModel.findOneAndUpdate({ "listId": req.body.listId, "taskId": req.body.taskId },
                      { $push: { subitemTodo: generatedToDo } },
                      { "upsert": true, "new": true },
                      function (error, success) {
                        console.log("Task save ")
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(success);
                        }
                      });
                  }
                });
              }
            });
          }
        }
      );
    });
  }; //end of saveToDoParent

  /*
         Function Calls
    */
  validateParameters(req, res)
    .then(saveToDoParent)
    .then(resolve => {
      let apiResponse = response.generate(false, "Sub ToDo Created Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
};

let updateTaskToDo = (req, res) => {
  let options = req.body
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.title)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: updateTaskToDo()", 10);
          let apiResponse = response.generate(true, "createdBy field is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title of list is missing in the request", "singleTodoController: updateTaskToDo()", 10);
        let apiResponse = response.generate(true, "title of list is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters
  let saveToDoList = () => {
    return new Promise((resolve, reject) => {
      TaskModel.update({ "listId": req.body.listId, "taskId": req.body.taskId }, options, { multi: true }
        , function (err, generatedToDo) {
          if (err) {
            logger.error(err.message, "singleTodoController: saveToDoList()", 10);
            let apiResponse = response.generate(true, "Unable to update   todo List", 400, null);
            reject(apiResponse);
          } else {
            resolve(generatedToDo)
          }
        });
    }
    );

  }; //end of saveToDoParent
  validateParameters(req, res)
    .then(saveToDoList)
    .then(resolve => {
      let apiResponse = response.generate(false, "Sub ToDo updated Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
};

let updateSubItemToDo = (req, res) => {
  console.log(req.body.title)
  console.log(req.params.listId)
  let options = req.body;
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.title)) {
        if (check.isEmpty(req.body.createdBy)) {
          logger.error("createdBy field is missing in the request", "singleTodoController: updateSubItemToDo()", 10);
          let apiResponse = response.generate(true, "createdBy field is required", 400, null);
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        logger.error("Title of list is missing in the request", "singleTodoController: updateSubItemToDo()", 10);
        let apiResponse = response.generate(true, "title of list is required", 400, null);
        reject(apiResponse);
      }
    });
  }; // end of validatePareters
  let saveToDoList = () => {
    return new Promise((resolve, reject) => {
      ListModel.findOne({ title: req.body.title.trim() }).exec(
        (err, listToDo) => {
          if (err) {
            logger.error(err.message, "singleTodoController: saveToDoList()", 10);
            let apiResponse = response.generate(true, "Failed to create todo " + err, 400, null);
            reject(apiResponse);
          } else if (!check.isEmpty(listToDo)) {
            logger.error("Title already exist", "singleTodoController: saveToDoList()", 7);
            let apiResponse = response.generate(true, "Title already exists", 400, null);
            reject(apiResponse);
          } else {

            SubTaskModel.update({ "listId": req.body.listId, "taskId": req.body.taskId, "subTaskId": req.body.subTaskId }, options, { multi: true }
              , function (err, generatedToDo) {

                if (err) {
                  //console.log(err)
                  logger.error(err.message, "singleTodoController: saveToDoList()", 10);
                  let apiResponse = response.generate(true, "Unable to update sub List", 400, null);
                  reject(apiResponse);
                } else {

                  resolve(generatedToDo)
                }
              });
          }
        }
      );
    });
  }; //end of saveToDoParent
  validateParameters(req, res)
    .then(saveToDoList)
    .then(resolve => {
      let apiResponse = response.generate(false, "Sub ToDo updated Successfully", 200, resolve);
      res.status(200);
      res.send(apiResponse);
    })
    .catch(err => {
      res.status(err.status);
      res.send(err);
    });
};

let getSubItemByParentId = (req, res) => {
  console.log("list id -" + req.params.taskId)
  //start of validateParameters, to check parameters and validate data
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.taskId)) {
        logger.error('parentId is missing in the request', 'singleTodoController: getSubItemByParentId', 10);
        let apiResponse = response.generate(true, 'parentId is required', 400, null);
        reject(apiResponse);
      } else {

        TaskModel.findOne({ 'taskId': req.params.taskId, 'createdBy': req.params.userId })
          .populate('subitemTodo')
          .lean()
          .exec((err, result) => {
            if (err) {
              logger.error(err.message, 'singleTodoController: getSubItemByParentId', 10);
              let apiResponse = response.generate(true, 'Failed to fetch todo parent data ' + err, 400, null);
              reject(apiResponse);
            } else if (check.isEmpty(result)) {
              logger.error('Failed to find parent details', 'singleTodoController: getSubItemByParentId', 10);
              let apiResponse = response.generate(true, 'Failed to find parent details, Check parent id', 400, null);
              reject(apiResponse);
            } else {
              resolve(result);
            }
          })
      }
    }); //end of return promise
  }
  validateParameters(req, res)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'to do list found successfully', 200, resolve)
      res.status(200)
      res.send(apiResponse)
    })
    .catch((err) => {
      res.send(err)
    })
}; //end of getToDoListByParentIdFunction

//delete subTask 
let deleteTodoSubTask = (req, res) => {

  if (check.isEmpty(req.body.listId)) {
    let apiResponse = response.generate(true, "list id is missing", 403, null);
    res.send(apiResponse);
  } else {

    SubTaskModel.findOneAndRemove({ 'subTaskId': req.body.subTaskId }, (err, result) => {

      if (err) {
        console.log("Error Occured.");
        logger.error(`Error Occured : ${err}`, "Database", 10);
        let apiResponse = response.generate(true, "Error Occured.", 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        console.log("list Not Found.");
        let apiResponse = response.generate(true, "list Not Found.", 404, null);
        res.send(apiResponse);
      } else {
        TaskModel.findOneAndUpdate({ "listId": req.body.listId, "taskId": req.body.taskId },
          { $pull: { 'subitemTodo': req.body._id } }, { multi: true },
          //   { "upsert": true, "new": true },
          function (error, success) {
            if (error) {
              let apiResponse = response.generate(true, "error occurred " + error, 500, null);
              res.send(apiResponse);
            } else {
              let apiResponse = response.generate(false, "Record Deleted Successfully", 200, result);
              res.send(apiResponse);
            }
          });
      }
    });
  }
};//Delete List function

//delete subTask 
let deleteTodoTask = (req, res) => {
  if (check.isEmpty(req.body.taskId)) {
    let apiResponse = response.generate(true, "list id is missing", 403, null);
    res.send(apiResponse);
  } else {
    SubTaskModel.remove({ 'taskId': req.body.taskId }, (err, result) => {
      if (err) {
        console.log("Error Occured.");
        logger.error(`Error Occured : ${err}`, "Database", 10);
        let apiResponse = response.generate(true, "Error Occured.", 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        console.log("list Not Found.");
        let apiResponse = response.generate(true, "list Not Found.", 404, null);
        res.send(apiResponse);
      } else {
        TaskModel.findOneAndRemove({ 'taskId': req.body.taskId }, (err, result) => {
          if (err) {
            console.log("Error Occured.");
            logger.error(`Error Occured : ${err}`, "Database", 10);
            let apiResponse = response.generate(true, "Error Occured.", 500, null);
            res.send(apiResponse);
          } else if (check.isEmpty(result)) {
            console.log("list Not Found.");
            let apiResponse = response.generate(true, "list Not Found.", 404, null);
            res.send(apiResponse);
          } else {
            console.log("update ")
            ListModel.findOneAndUpdate({ "listId": req.body.listId },
              { $pull: { 'itemTodo': req.body._id } }, { multi: true },
              //   { "upsert": true, "new": true },
              function (error, success) {

                if (error) {
                  let apiResponse = response.generate(true, "error occurred " + error, 500, null);
                  res.send(apiResponse);
                } else if (success) {
                  let apiResponse = response.generate(false, "Record Deleted Successfully", 200, result);
                  res.send(apiResponse);
                }
              });
          }
        });
      }
    });
  }
};//Delete List function

let findList = (req, res) => {

  //start of validateParameters, to check parameters and validate data
  let validateParameters = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.listId)) {
        logger.error('parentId is missing in the request', 'singleTodoController: findList', 10);
        let apiResponse = response.generate(true, 'parentId is required', 400, null);
        reject(apiResponse);
      } else {
        ListModel.find({ 'listId': req.params.listId })//yase list find kar rahi h o
          .lean()
          .exec((err, result) => {
            if (err) {
              logger.error(err.message, 'singleTodoController: findList', 10);
              let apiResponse = response.generate(true, 'Failed to fetch todo parent data ' + err, 400, null);
              reject(apiResponse);
            } else if (check.isEmpty(result)) {
              logger.error('Failed to find parent details', 'singleTodoController: findList', 10);
              let apiResponse = response.generate(true, 'Failed to find parent details, Check parent id', 400, null);
              reject(apiResponse);
            } else {
              resolve(result);
            }
          })
      }
    }); //end of return promise
  }
  validateParameters(req, res)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'to do list found successfully', 200, resolve)
      res.status(200)
      res.send(apiResponse)
    })
    .catch((err) => {
      res.status(err.status)
      res.send(err)
    })
}; //end of getToDoItemListByParentIdFunction

let completeListFunction = (req, res) => {
  let validateInput = () => {
    return new Promise((resolve, reject) => {
      if (!check.isEmpty(req.body.listId)) {
        resolve(req);
      } else {
        logger.error('multiToDo ID  is missing or null', 'multiToDoController: editToDoItemTitleFunction() =>validateInput', 10);
        let apiResponse = response.generate(true, 'MultiTodId is missing or null in the request', 400, null);
        reject(apiResponse);
      }

    });
  }; //end of validateInput function
  let findAndUpdateList = () => {
    return new Promise((resolve, reject) => {
      var query = { listId: req.body.listId }
      ListModel.findOneAndUpdate(query, { isComplete: req.body.isComplete }, (err, result) => {
        if (err) {
          logger.error(err.message, 'SingleToDoController: completeListFunction()=>findAndUpdateData', 10);
          let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    }); //end of getAllItems
  }; //end of findAndUpdateData
  let findAndUpdateTask = () => {
    return new Promise((resolve, reject) => {
      var query = { listId: req.body.listId }
      TaskModel.updateMany(query, { isComplete: req.body.isComplete }, (err, result) => {
        if (err) {
          logger.error(err.message, 'SingleToDoController: completeListFunction()=>findAndUpdateData', 10);
          let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    }); //end of getAllItems
  }; //end of findAndUpdateTask
  let findAndUpdateSubTask = () => {
    return new Promise((resolve, reject) => {
      var query = { listId: req.body.listId }
      SubTaskModel.updateMany(query, { isComplete: req.body.isComplete }, (err, result) => {
        if (err) {
          logger.error(err.message, 'SingleToDoController: completeListFunction()=>findAndUpdateData', 10);
          let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
          reject(apiResponse);
        } else {
          resolve(result);
        }
      });
    }); //end of getAllItems
  }; //end of findAndUpdateData

  validateInput(req, res)
    .then(findAndUpdateList)
    .then(findAndUpdateTask)
    .then(findAndUpdateSubTask)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'Data Updated successfully', 200, resolve)
      res.status(200)
      res.send(apiResponse)
    }).catch((err) => {
      //console.log(err)
      res.status(err.status)
      res.send(err)
    });
};

module.exports = {
  createTodoList: createTodoList,
  findAllList: findAllList,
  deleteTodoList: deleteTodoList,
  editTodoList: editTodoList,
  createItemTodo: createItemTodo,

  getToDoItemListId: getToDoItemListId,
  createSubItem: createSubItem,
  updateSubItemToDo: updateSubItemToDo,
  getSubItemByParentId: getSubItemByParentId,
  updateTaskToDo: updateTaskToDo,
  deleteTodoSubTask: deleteTodoSubTask,
  deleteTodoTask: deleteTodoTask,
  findList: findList
  // completeList: completeListFunction


};


