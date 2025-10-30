import mongoose, {Document, Model, Schema, Types } from 'mongoose';

export interface IActivity extends Document {
    userId: Types.ObjectId,
    title: string;
    disciplineId: Types.ObjectId;
    startDateTime: Date;
    endDateTime: Date;
    duration?: number;
}

const ActivitySchema = new Schema<IActivity>({
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
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number
    }
});

ActivitySchema.set('toJSON', {
    transform: (doc, ret: Partial<IActivity>) => {
        delete ret.userId;
        return ret;
    }
})

const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', ActivitySchema);

export default Activity;