require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection failed:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});