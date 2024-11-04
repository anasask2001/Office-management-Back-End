import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1 
  },
  type: {
    type: String,
    enum: ['Conference Hall', 'Cabin'],
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  bookings: [
    {
      startTime: {
        type: Date, 
      },
      duration: {
        type: Number, 
        required: true
      },
      bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff', 
      },
      bookingFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern',
      },
      isDelete: {
        type: Boolean,
        default: true,
      }
    }
  ]
}, {
  timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
 
export { Room };
