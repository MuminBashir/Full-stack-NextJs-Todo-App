import mongoose, { Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  owner: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Todo: mongoose.Model<ITodo>;

if (mongoose.models.Todo) {
  // If the model already exists, use the existing model
  Todo = mongoose.model<ITodo>("Todo");
} else {
  // If the model does not exist, define and compile it
  Todo = mongoose.model<ITodo>("Todo", schema);
}

export default Todo;
