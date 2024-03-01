import mongoose from "mongoose";


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/EcommerceNextJS",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

