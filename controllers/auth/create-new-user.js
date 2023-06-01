const { generateJWT } = require('../../helpers/generate-jwt');
const User = require('../../models/user');

const createNewUser = async (req, res, next) => {
  try {
    const dataUser = req.body;
    const newUser = new User(dataUser);
    await newUser.save();
    const token = await generateJWT(newUser.id);
    res.success({
      statusCode: 201,
      message: 'Usuario creado con éxito',
      payload: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
};
