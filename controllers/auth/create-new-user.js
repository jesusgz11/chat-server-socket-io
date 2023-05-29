const User = require('../../models/user');

const createNewUser = async (req, res, next) => {
  try {
    const dataUser = req.body;
    const newUser = new User(dataUser);
    await newUser.save();
    res.success({
      statusCode: 201,
      message: 'Usuario creado con éxito',
      payload: {
        ok: true,
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
};
