const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type:String,
    unique: true,
  },
  password: String
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

module.exports = User;
