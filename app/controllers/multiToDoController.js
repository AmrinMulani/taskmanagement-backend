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
const MultiToDoModel = mongoose.model('MultiToDo');
const MultiTrnModel = mongoose.model('MultiToDoTrn');
let multiData


let createTodoFunction = (req, res) => {
    //start of validateInput function
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.title)) {
                if (!check.isEmpty(req.body.createdBy)) {
                    resolve(req);
                } else {
                    logger.error('crated By is required', 'multiToDoController: addToDoItemFunction()', 10);
                    let apiResponse = response.generate(true, 'Created By', 400, null);
                    reject(apiResponse);
                }
            } else {
                logger.error('title is required', 'multiToDoController: addToDoItemFunction()', 10);
                let apiResponse = response.generate(true, 'Todo item title is missing in the request', 400, null);
                reject(apiResponse);
            }
        });
    }; //end of validateInput function

    //start of saveToDoItem function
    let saveTodo = () => {
        return new Promise((resolve, reject) => {
            //let desc = req.body.description.trim
            MultiToDoModel.findOne({ title: req.body.title.trim(), createdBy: req.body.createdBy })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'multiToDoController: saveToDoItem()', 10);
                        let apiResponse = response.generate(true, err.message, 400, null);
                        reject(apiResponse);
                    } else if (!check.isEmpty(result)) {
                        logger.error('to do title already exist', 'multiToDoController: saveToDoItem()', 7);
                        let apiResponse = response.generate(true, 'Todo item already exists', 400, null);
                        reject(apiResponse);
                    } else {
                        let todoObj = new MultiToDoModel({
                            multiToDoId: shortid.generate(),
                            title: req.body.title.trim(),
                            createdBy: req.body.createdBy,
                            createdOn: time.now()
                        });
                        //save to db
                        todoObj.save((err, generatedToDoItem) => {
                            if (err) {
                                //console.log(err)
                                logger.error(err.message, 'multiToDoController: saveToDoItem()', 10);
                                let apiResponse = response.generate(true, 'Unable to create new todo parent', 400, null);
                                reject(apiResponse);
                            } else {
                                let generatedToDoItemObject = generatedToDoItem.toObject();
                                resolve(generatedToDoItemObject);
                                console.log("save todo")
                            }
                        });
                    }
                })
        });
    }; //end of saveTodo function

    //start of saveTransaction function
    let saveTransaction = (toDoItem) => {
        return new Promise((resolve, reject) => {

            let todoObj = new MultiTrnModel({
                trnId: shortid.generate(),
                multiToDoId: toDoItem.multiToDoId,
                oldTitle: req.body.title.trim(),
                isCompleted: toDoItem.isCompleted,
                changed: 'title',
                remarks: req.body.remarks,
                createdOn: time.now(),
                createdBy: req.body.createdBy,
                editBy: req.body.editBy
            });

            //save to db
            todoObj.save((err, generatedToDoItem) => {
                if (err) {
                    //console.log(err)
                    logger.error(err.message, 'multiToDoController: saveTransaction()', 10);
                    let apiResponse = response.generate(true, 'Unable to save transaction', 400, null);
                    reject(apiResponse);
                } else {
                    let generatedToDoItemObject = generatedToDoItem.toObject();
                    resolve(generatedToDoItemObject);
                }
            });
        });
    }; //end of saveTransaction function

    validateInput(req, res)
        .then(saveTodo)
        .then(saveTransaction)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'ToDoItem Created Successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        }).catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
}; //end of addToDoItemFunction

let getToDoListFunction = (req, res) => {
    //start of validateInput function
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.params.userId)) {
                resolve(req);
            } else {
                logger.error('user id is required', 'multiToDoController: getToDoItemsFunction()', 10);
                let apiResponse = response.generate(true, 'user id is missing in the request', 400, null);
                reject(apiResponse);
            }
        });
    }; //end of validateInput function

    let getAllList = () => {
        return new Promise((resolve, reject) => {
            MultiToDoModel.find({
                createdBy: req.params.userId
            }).
                select().lean().exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'multiToDoController: getToDoItemsFunction()', 10);
                        let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                });
        }); //end of getAllItems
    }
    validateInput(req, res)
        .then(getAllList).then((resolve) => {
            let apiResponse = response.generate(false, 'Data fetched successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        }).catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
}; //end of getToDoItemsFunction

let editToDoFunction = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.multiToDoId)) {
                if (!check.isEmpty(req.body.title)) {
                    if (!check.isEmpty(req.body.editBy)) {
                        resolve(req);
                    } else {
                        logger.error('editBy is missing or null', 'multiToDoController: editToDoItemTitleFunction() =>validateInput', 10);
                        let apiResponse = response.generate(true, 'editBy is missing or null in the request', 400, null);
                        reject(apiResponse);
                    }
                } else {
                    logger.error('title is missing or null', 'multiToDoController: editToDoItemTitleFunction() =>validateInput', 10);
                    let apiResponse = response.generate(true, 'title is missing or null in the request', 400, null);
                    reject(apiResponse);
                }
            } else {
                logger.error('id is required', 'multiToDoController: editToDoItemTitleFunction()=>validateInput', 10);
                let apiResponse = response.generate(true, 'id is missing in the request', 400, null);
                reject(apiResponse);
            }
        });
    }; //end of validateInput function
    let findAndUpdateData = () => {
        return new Promise((resolve, reject) => {
            var query = { multiToDoId: req.body.multiToDoId }
            MultiToDoModel.findOneAndUpdate(query, { title: req.body.title }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'multiToDoController: editToDoItemTitleFunction()=>findAndUpdateData', 10);
                    let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        }); //end of getAllItems
    }; //end of findAndUpdateData

    let insertTodoTrans = (oldToDoData) => {

        return new Promise((resolve, reject) => {
            console.log("remarks" + req.body.remarks)
            let data = new MultiTrnModel({
                trnId: shortid.generate(),
                multiToDoId: oldToDoData.multiToDoId,
                oldTitle: req.body.oldTitle.trim(),
                isCompleted: oldToDoData.isCompleted,
                changed: 'title',
                remarks: req.body.remarks,
                createdOn: time.now(),
                editBy: req.body.editBy,
                createdBy: oldToDoData.createdBy
            });
            data.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'multiToDoController: editToDoItemTitleFunction() =>insertData', 10);
                    let apiResponse = response.generate(true, 'Unable to save transaction', 400, null);
                    reject(apiResponse);
                } else {
                    let generatedToDoItemObject = result.toObject();
                    resolve(generatedToDoItemObject);
                }
            });
        });
    }; //end of insert data

    validateInput(req, res)
        .then(findAndUpdateData)
        .then(insertTodoTrans)
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


let delTodoListFunction = (req, res) => {
    console.log("deete ")
    if (check.isEmpty(req.params.multiToDoId)) {
        console.log("List id  should be passed");
        let apiResponse = response.generate(true, "list id is missing", 403, null);
        res.send(apiResponse);
    } else {
        MultiToDoModel.findOneAndRemove({ multiToDoId: req.params.multiToDoId }, (err, result) => {
            //  console.log(result)
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
                MultiTrnModel.remove({ multiToDoId: req.params.multiToDoId }, (err, result) => {

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

};//Delete List function

let getToDoTransactionById = (req, res) => {
    console.log("get history")
    //start of validateInput function
    console.log(req.query.skip)
    console.log(req.query.multiToDoId)
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.query.multiToDoId)) {
                resolve(req);
            } else {
                logger.error('todo id is required', 'multiToDoController: getToDoTransactionById()', 10);
                let apiResponse = response.generate(true, 'todo id is missing in the request', 400, null);
                reject(apiResponse);
            }
        });
    }; //end of validateInput function

    let getAllItems = () => {
        return new Promise((resolve, reject) => {
            MultiTrnModel.countDocuments({ multiToDoId: req.query.multiToDoId }, (err, count) => {
                console.log(count)
                MultiTrnModel.find({
                    multiToDoId: req.query.multiToDoId.trim()
                }).sort({ 'createdOn': 'desc' })
                    .skip(parseInt(req.query.skip))
                    .limit(5)
                    .exec((err, data) => {
                        if (err) {
                            logger.error(err.message, 'multiToDoController: getToDoTransactionById()', 10);
                            let apiResponse = response.generate(true, 'error while getting data- ' + err.message, 400, null);
                            reject(apiResponse);
                        } else {
                            console.log(data)
                            multiData = {
                                countHistory: count,
                                transcList: data
                            }
                            resolve(multiData);
                        }
                    });
            }); //end of getAllItems
        }
        )
    }

    validateInput(req, res)
        .then(getAllItems).then((resolve) => {
            let apiResponse = response.generate(false, 'Data fetched successfully', 200, multiData)
            res.status(200)
            res.send(apiResponse)

            console.log("trans")
            console.log(apiResponse)
        }).catch((err) => {
            //console.log(err)
            res.status(err.status)
            res.send(err)
        });
}; //end of getToDoItemsFunction

//function to undo/revert change and show last transaction
let undoTodo = (req, res) => {

    console.log("undo function")
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.params.multiToDoId)) {
                if (!check.isEmpty(req.params.multitrnId)) {
                    resolve(req)
                } else {
                    logger.error('transaction id is missing or null', 'multiToDoController: undo History =>validateInput', 10);
                    let apiResponse = response.generate(true, 'transaction id is missing or null in the request', 404, null);
                    reject(apiResponse);
                }
            } else {
                logger.error('mutlitodo id is required', 'multiToDoController: editMultitodo()=>validateInput', 10);
                let apiResponse = response.generate(true, 'multi todo  id is missing in the request', 404, null);
                reject(apiResponse);
            }
        });
    } //end validate input

    //function to find current transaction multitodo
    let findTransaction = () => {
        console.log('\n\inside findTrans')
        console.log(req.params.multiToDoId)
        console.log(req.params.multitrnId)
        return new Promise((resolve, reject) => {
            MultiTrnModel.findOne({
                'multiToDoId': req.params.multiToDoId, 'trnId': req.params.multitrnId
            },
                (err, lastTransac) => {
                    console.log(lastTransac)
                    if (err) {
                        logger.error(`error finding multitodo transaction ${err}`, `multiTodo.js=>undoHistory-findTransaction`, 10)
                        let apiResponse = response.generate(true, `Error getting multi-todo transaction`, 500, null)
                        reject(apiResponse)
                    } else {
                        resolve(lastTransac)
                        console.log(lastTransac)
                    }
                }
            )
        })
    } //end findTransaction

    //function to check title change and revert back to previous title.
    let multiTodoUndo = (lastTransac) => {
        console.log('\n\n\ninside foundTransaction')
        console.log(lastTransac)
        return new Promise((resolve, reject) => {
            //if title is changed then update multitodo 
            if (lastTransac.changed == "title") {
                let lastTitle = {
                    title: lastTransac.oldTitle
                }
                MultiToDoModel.findOneAndUpdate({
                    multiToDoId: lastTransac.multiToDoId
                },
                    lastTitle, (err, updatedMultiTodo) => {
                        console.log(updatedMultiTodo)

                        if (err) {
                            logger.error(`Error updating multitodo title ${err}`, `multiTodo.js-undoHistory-multiTodoUndo`, 10)
                            let apiResponse = response.generate(true, `Error updating multi current todo title to previous title`, 500, 10)
                            reject(apiResponse)
                        } else {
                            console.log(updatedMultiTodo)
                            resolve(updatedMultiTodo)
                        }
                    })
            }
        })
    } //end multiTodoUndo

    //function to delete last transaction
    let deleteLastTransaction = () => {
        console.log('\n\n\ninside delete')
        return new Promise((resolve, reject) => {
            MultiTrnModel.findOneAndDelete({
                'multiTodoId': req.params.multiTodoId,
                'trnId': req.params.multitrnId
            },
                (err, result) => {
                    if (err) {
                        logger.error(`Error deleting multitodo transaction ${err}`, `multiTodo.js-undoHistory-deleteTransction`, 10)
                        let apiResponse = response.generate(true, `Error deleting multitodo transaction`, 500, 10)
                        reject(apiResponse)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    } //end deleteLastTransaction


    validateInput(req, res)
        .then(findTransaction)
        .then(multiTodoUndo)
        .then(deleteLastTransaction)
        .then((resolve) => {
            logger.info(`Undo task success`, `multiTodo.js=>undoHistory()`, 10)
            let apiResponse = response.generate(false, `Undo/Revert Successfully done`, 200, resolve)
            res.status(200)
            res.send(apiResponse)
        }).catch((err) => {
            res.status(err.status)
            res.send(err)
        })
}

let completeToDoFunction = (req, res) => {
    //start of validateInput function
    //let options = req.body
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (!check.isEmpty(req.body.multiToDoId)) {
                resolve(req);
            } else {
                logger.error('multiToDo ID  is missing or null', 'multiToDoController: editToDoItemTitleFunction() =>validateInput', 10);
                let apiResponse = response.generate(true, 'MultiTodId is missing or null in the request', 400, null);
                reject(apiResponse);
            }

        });
    }; //end of validateInput function
    let findAndUpdateData = () => {
        return new Promise((resolve, reject) => {
            var query = { multiToDoId: req.body.multiToDoId }
            MultiToDoModel.findOneAndUpdate(query, { isCompleted: req.body.isCompleted }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'multiToDoController: editToDoItemTitleFunction()=>findAndUpdateData', 10);
                    let apiResponse = response.generate(true, 'erro while getting data- ' + err.message, 400, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        }); //end of getAllItems
    }; //end of findAndUpdateData



    validateInput(req, res)
        .then(findAndUpdateData)
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
    createTodo: createTodoFunction,
    getToDoList: getToDoListFunction,
    editToDo: editToDoFunction,
    delTodoList: delTodoListFunction,
    getToDoTransactionById: getToDoTransactionById,
    undoTodo: undoTodo,
    completeToDo: completeToDoFunction
};