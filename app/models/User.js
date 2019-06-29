const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: "",
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  fullName: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: "pasword123"
  },
  email: {
    type: String,
    default: ""
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: ""
  },
  countryCode: {
    type: String,
    default: ""
  },

  friends: [],

  friendRequestSent: [],

  friendRequestRecieved: [],

  createdOn: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("User", userSchema);

//array
/*
let array = [current user, friend, freinreQ, friendRew]

UserModel.find({$ne:{'userId':req.body.userId}})
.exec((err, res)=>)

*/