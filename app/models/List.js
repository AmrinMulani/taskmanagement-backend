"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let listSchema = new Schema({
  listId: {
    type: String,
    index: true,
    unique: true
  },
  title: {
    type: String,
    index: true,
    required: true,
    uppercase: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  itemTodo: [
    {
      type: Schema.Types.ObjectId, ref: "Task"

    }
  ],
  createdBy: { type: Schema.Types.String, ref: "User" },
  createdOn: {
    type: Date
  }
});

const TodoList = mongoose.model("List", listSchema);

