const express = require('express')
const dbConnect = require('./config/db');

const app = express();

//connect DB
dbConnect();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//Define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profile'));
app.use('/api/storageplaces', require('./routes/api/storagePlaces'));
app.use('/api/fooditems', require('./routes/api/foodItem'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));