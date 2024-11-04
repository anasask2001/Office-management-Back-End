import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
    batch_number: {
        type: String,
        required: true,
        unique: true,   
    },
    advisor:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff'
    },
    created_at: {
        type: Date,
        default: Date.now,  
    },
    updated_at: {
        type: Date,
        default: Date.now,  
    },
});



const Batch = mongoose.model('Batch', batchSchema);

export {Batch}
