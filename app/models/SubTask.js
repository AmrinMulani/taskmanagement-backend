"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let subTaskSchema = new Schema({
    subTaskId: {
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
    listId: {
        type: String
    },
    taskId: {
        type: String
    },

    isComplete: {
        type: Boolean,
        default: false
    },

    createdBy: { type: Schema.Types.String, ref: "User" },
    createdOn: {
        type: Date
    }
});

const TodoList = mongoose.model("SubTask", subTaskSchema);

