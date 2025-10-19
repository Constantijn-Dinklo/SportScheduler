import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;