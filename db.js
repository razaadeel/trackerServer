const mongoose = require('mongoose');

const db = 'mongodb+srv://admin:admin@mern-n1n1y.mongodb.net/track?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
        console.log('Database Connected...');
    }
    catch (err) {
        console.log(err.message);
        //process exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;