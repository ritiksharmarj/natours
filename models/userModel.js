const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Defining schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  // role: {
  //   type: String,
  //   enum: ['user', 'guide', 'lead-guide', 'admin'],
  //   default: 'user',
  // },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // active: {
  //   type: Boolean,
  //   default: true,
  //   select: false,
  // },
});

/**
 * when a document is created and later any of the values is updated/changed, that property would be considered as modified and the mongoose isModified returns true if that particular property has been modified or false if it hasn't been modified.
 * Hash the password before saving it to database
 */
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

/**
 * Our own custom document instance methods
 * https://mongoosejs.com/docs/guide.html#methods
 *
 * @param {String} plainTextPassword - User's current entered password
 * @param {String} hashPassword - User password from database
 * @returns - True or False
 */
userSchema.methods.correctPassword = async function (
  plainTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

// Creating a model
const User = mongoose.model('User', userSchema);

module.exports = User;
