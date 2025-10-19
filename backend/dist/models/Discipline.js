"use strict";
const { Schema, model } = require('mongoose');
const DisciplineSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    }
});
module.exports = model('Discipline', DisciplineSchema);
