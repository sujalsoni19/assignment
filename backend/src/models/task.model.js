import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },  
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},{ timestamps: true })

export const Task = mongoose.model("Task", taskSchema)
