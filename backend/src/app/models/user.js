const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  currentExperience: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  challenges: {
    type: Number,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;