'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let multiToDoTrnSchema = new Schema({
    trnId: { type: String, required: true },
    multiToDoId: { type: Schema.Types.String, ref: 'MultiToDo', required: true },
    oldTitle: {
        type: String,
        required: true,
        uppercase: true
    },
    isCompleted: {
        default: false,
        type: Boolean
    },
    changed: {
        type: String,
        default: '',
    },
    remarks: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ""
    },
    createdBy: { type: String, required: true },
    editBy: { type: Schema.Types.String, ref: 'User', required: true },
})

mongoose.model('MultiToDoTrn', multiToDoTrnSchema);