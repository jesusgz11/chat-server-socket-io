const { response, request } = require('express');

const login = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

module.exports = {
  login,
};
