const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

// Create a server on 127.0.0.1:8000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server started 🖐');
});
