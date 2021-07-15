const { PORT, MONGO_URI } = require('./context/env');
const { establishConnection } = require('./models/utils');

const app = require('./app');

establishConnection(MONGO_URI).then(
  () => {
    app.listen(PORT);
    console.log(`app listening port ${PORT}`);
  },
  (err) => {
    console.error('err', err);
  }
);
