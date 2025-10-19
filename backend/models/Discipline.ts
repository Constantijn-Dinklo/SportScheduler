import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IDiscipline extends Document {
    userId: Types.ObjectId,
    name: string;
}

const DisciplineSchema = new Schema<IDiscipline>({
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

const Discipline: Model<IDiscipline> = mongoose.model<IDiscipline>('Discipline', DisciplineSchema);

export default Discipline;