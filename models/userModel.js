const crypto = require('crypto');
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
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

/**
 * The regular expression "/^find/" is used to match any query operation that starts with "find". It uses the ^ symbol to match the beginning of the query operation. So, for example, it will match operations like "find", "findOne", "findOneAndUpdate", etc.
 */
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

/**
 * Our own custom document instance methods
 * https://mongoosejs.com/docs/guide.html#methods
 *
 * @param {String} plainTextPassword - User's current entered password
 * @param {String} hashPassword - User password from database
 * @returns Boolean
 */
userSchema.methods.comparePassword = async function (
  plainTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

/**
 * Check if user changed password after the token was issued
 * @param {Number} tokenIssuedAt - Generated jwts will include an iat (issued at)
 * @returns Boolean
 */
userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const changedTimestamp = new Date(this.passwordChangedAt).getTime() / 1000;

    return tokenIssuedAt < changedTimestamp;
  }

  // FALSE means not changed
  return false;
};

/**
 * Generate reset token to reset password
 * @returns reset token
 */
userSchema.methods.generatePasswordResetToken = function () {
  // simple reset Token for sending to user's mail
  const resetToken = crypto.randomBytes(32).toString('hex');

  // encrypted reset token, save to database
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Password reset token will be valid for 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Creating a model
const User = mongoose.model('User', userSchema);

module.exports = User;
