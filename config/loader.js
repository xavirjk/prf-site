const auth = require('./auth');
const ct = require('./client');
const { client } = require('./conf_client');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/update', client);
  app.use('/user', client);
  app.use('/ref', ct);
  app.use('/', (req, res, next) => {
    console.log('Home');
    res.status(200).send('Welcome');
  });
};
