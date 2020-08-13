const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});

//Load Bootcamps;
const Bootcamp = require('./Model/Bootcamp');

//Coonect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
//read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`));
//inport into DB 
const importData = async() => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported'.green.inverse);
        process.exit()
    } catch (err) {
        console.log(err);
    }
};
//delete data
const deletetData = async() => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed'.red.inverse);
        process.exit()
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    deletetData()
}