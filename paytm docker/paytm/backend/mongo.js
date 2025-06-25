const mongoose = require("mongoose");
require("dotenv").config(); // add this line at the top
// MongoDB connection
const mongourl = process.env.MONGO_URL 
// console.log("Connecting to MongoDB:", mongourl);
mongoose.connect(mongourl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const user = mongoose.model("userr",userSchema);


// Payment schema and model
const accountSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'user',//user need to to be account in our bank 
    required: true
  },
  balance:{
    type: Number,
    required: true
}
});
const account = mongoose.model("Account",accountSchema);

module.exports ={user,account};
