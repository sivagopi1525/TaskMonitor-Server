require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');


const PORT = process.env.PORT || 3000;


// Connect to DB first
connectDB()
.then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('Failed to start server, DB connect error:', err);
process.exit(1);
});