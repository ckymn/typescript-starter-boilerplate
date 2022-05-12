import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectDB = async () => {
    try {
        let dbUri = config.get("db.dbUri") as String;

        await mongoose.connect(dbUri)
            .then((response) => {
                log.info(`MongoDB connection name : ${response.connection.name} on ${response.connection.port}`)
            })


    } catch (error) {
        log.error("Could not connect to DB : ", error);
        process.exit(1); // kill program
    }

}

export default connectDB;