const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { generateApiError } = require('../helpers/generate-api-error');

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    throw generateApiError({
      message: `Fallo al guardar documento de ${user.email}`,
    });
  }
});

UserSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...userData } = this.toObject();
  userData.uid = _id;
  return userData;
});

module.exports = model('Users', UserSchema);
