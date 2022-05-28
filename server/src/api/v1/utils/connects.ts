import mongoose from 'mongoose';
import log from './logger';

const connectDB = async () => {
    try {
        let dbUri = process.env.dbUri

        await mongoose.connect(String(dbUri))
            .then((response) => {
                log.info(`MongoDB connection name : ${response.connection.name} on ${response.connection.port}`)
            })


    } catch (error) {
        log.error("Could not connect to DB : ", error);
        process.exit(1); // kill program
    }

}

export default connectDB;