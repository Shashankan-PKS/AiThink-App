import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect('mongodb://localhost/QuickAi')
    .then(() => 
        console.log("DB connected")
    )
    .catch((err) => {
        console.log( `Error: ${err}` )
    })
}