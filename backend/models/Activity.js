const {Schema, model} = require('mongoose');

const ActivitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    disciplineId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Discipline'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number
    }
});

ActivitySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.userId;
        return ret;
    }
})

module.exports = model('Activity', ActivitySchema);