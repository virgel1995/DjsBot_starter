const mongoose = require("mongoose");

module.exports = {
  async initializeMongoose(uri) {
    console.log(`Connecting to MongoDb...`);

    try {
      await mongoose.connect(uri, {
        keepAlive: true,
      });

      console.log("Mongoose: Database connection established");
    } catch (err) {
      console.log("Mongoose: Failed to connect to database", err);
      process.exit(1);
    }
  },

  schemas: {
  Guild: require("./Schema/Guild"),
  User: require("./Schema/User"),
  },
};