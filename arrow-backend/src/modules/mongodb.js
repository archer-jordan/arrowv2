import mongoose from 'mongoose';
import dotenv from 'dotenv';

// pulls in and sets our environment variables from a .env file
dotenv.config();

mongoose.set('useCreateIndex', true);

// connect mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// export to be used by accountsjs
export const db = mongoose.connection;

// if there is an error, log it
db.on('error', console.error.bind(console, 'connection error:'));

// try to open the mongodb connection
db.once('open', function() {
  // we're connected!
  console.log('mongo connected');
});

export default mongoose;
