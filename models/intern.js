import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
      type: Number,
      required: true,
  },
  profileImg:{
    type:String
  },
  stack: {
    type: String,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch', 
    required: true,
  },
  seat:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Seat"
  },

  is_delete: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Intern = mongoose.model("Intern", internSchema);
export { Intern };
