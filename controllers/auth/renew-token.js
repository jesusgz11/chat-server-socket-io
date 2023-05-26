const { response } = require('express');

const renewToken = async (req, res = response) => {
  res.json({
    ok: true,
  });
};

module.exports = {
  renewToken,
};
