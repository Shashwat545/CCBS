const mongoose = require("mongoose") ;

const Schema = mongoose.Schema ;

const  boookingSchema = new Schema(
    {
    event: {
        type: Schema.Types.ObjectId, 
        ref: 'Event'
    },
    user: {
        type: Schema.Types.OOOOOOOOobjectId,
        ref: 'User'
    }
    },
    { timestamps: true }

) ;

 