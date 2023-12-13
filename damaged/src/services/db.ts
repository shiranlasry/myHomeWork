// db.ts
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://shiranlasry1:jf1EdIVAk2IXUUKU@cluster0.hsoq9u5.mongodb.net/damaged';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
