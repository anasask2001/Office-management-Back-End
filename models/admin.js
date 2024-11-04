import mongoose from "mongoose";


const adminSchema = new mongoose.Schema(
  {
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
    },

    stack: [
      {
        type: String,
      },
    ],
    roles: [
      {
        type: String,
      },
    ],

    is_delete: {
      type: Boolean,
      default: false,
    },
    is_active:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);


const Admin = mongoose.model("Admin", adminSchema);

export  { Admin };
