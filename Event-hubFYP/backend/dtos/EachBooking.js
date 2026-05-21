const EachBooking={
    bookedEvent:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    
    bookAt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    guestSize: {
        type: Number,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}