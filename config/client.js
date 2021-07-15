const router = require('express').Router();

const { client } = require('../controllers');

router.post('/links/', client.postLinks);
router.post('/info/', client.postdescription);
router.post('/profile/', client.postProfile);
router.post('/pid/', client.postPid);
router.get('/about/', client.getAbout);
router.get('/bio/', client.getBio);
router.get('/client/', client.getClient);

module.exports = router;
