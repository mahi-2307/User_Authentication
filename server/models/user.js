const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://mahikatamreddy:mahidhar@cluster0.ci7bd7k.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));
const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password should be at least 8 characters long"],
    },
  },
  { collection: "user-data" }
);
const model = mongoose.model("UserData", User);
module.exports = model;
