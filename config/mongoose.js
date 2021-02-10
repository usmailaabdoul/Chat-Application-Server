const mongoose = require('mongoose');

let mongooseConnection;

async function run(mongoUrl, forceRefresh = false) {
  if (mongooseConnection && !forceRefresh) { return mongooseConnection; }

  try {
    const mongooseOption = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };

    mongooseConnection = await mongoose.connect(mongoUrl, mongooseOption);

    return mongooseConnection;
  } catch (e) {
    console.log('Error while connecting to MongoDB');
    console.log(e);
    process.exit(-1);
  }
};

module.exports = run;
