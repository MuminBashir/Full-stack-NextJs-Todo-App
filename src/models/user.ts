import mongoose, { Document } from 'mongoose';


interface IUser extends Document {
    name: string;
    email: string;
    password: string
    todos: mongoose.Schema.Types.ObjectId[]
  }

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]

});

let User: mongoose.Model<IUser>;

if (mongoose.models.User) {
  // If the model already exists, use the existing model
  User = mongoose.model<IUser>('User');
} else {
  // If the model does not exist, define and compile it
  User = mongoose.model<IUser>('User', schema);
}

export default User;
