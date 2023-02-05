const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.set('debug', true);

// app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}!`);
  });
});