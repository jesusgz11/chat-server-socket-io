const mongoose = require('mongoose');
const { generateApiError } = require('../helpers/generate-api-error');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB online');
  } catch (error) {
    await mongoose.disconnect();
    throw generateApiError({ message: 'Conection to DB failed' });
  }
};

module.exports = {
  dbConection,
};
