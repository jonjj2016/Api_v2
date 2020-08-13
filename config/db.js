const mongoose = require('mongoose');
const connectDB = async() => {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`MongoDb Connected: ${connection.connection.host}`.underline.cyan.italic);
};
module.exports = connectDB;