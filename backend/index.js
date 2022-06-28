const mongoose = require('mongoose');
const app = require('./api/index');
const config = require('./config');

// Connect database mongo
const boot = async () => {
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  
  app.listen(config.port, () => {
    console.log(`Server is listening to ${config.port}`);
  });
}

boot();