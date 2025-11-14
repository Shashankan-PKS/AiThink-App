import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(`${process.env.MONGO_URI}/aithink-db`)
    .then(() => 
        console.log("DB connected")
    )
    .catch((err) => {
        console.log( `Error: ${err}` )
    })
}