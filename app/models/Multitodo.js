'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let multiToDoSchema = new Schema({
    multiToDoId: { type: String, unique: true, index: true, required: true },
    title: {
        type: String,

        required: true,
        uppercase: true
    },
    isCompleted: {
        default: false,
        type: Boolean
    },
    createdOn: {
        type: Date,
        default: ""
    },
    createdBy: { type: Schema.Types.String, ref: 'User' },

})

mongoose.model('MultiToDo', multiToDoSchema);