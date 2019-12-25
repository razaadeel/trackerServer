require('./models/User');
require('./models/Track');
const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

//Connecting Database (Mongo)
connectDB();

app.get('/', requireAuth, (req, res) => {
    res.send(`Your Email is: ${req.user.email}`);
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 