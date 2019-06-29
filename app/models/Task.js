"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let taskSchema = new Schema({
    taskId: {
        type: String,
        index: true,
        unique: true
    },
    title: {
        type: String,
        index: true,
        unique: true,
        required: true,
        uppercase: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    listId: {
        type: String
    },
    subitemTodo: [
        {
            type: Schema.Types.ObjectId, ref: "SubTask"

        }
    ],
    createdBy: { 
        type: Schema.Types.String, ref: "User" },
    createdOn: {
        type: Date
    }
});

const TodoList = mongoose.model("Task", taskSchema);

