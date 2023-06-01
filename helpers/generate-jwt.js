const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid },
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el JWT');
          return;
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
