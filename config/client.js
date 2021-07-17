const router = require('express').Router();

const { client } = require('../controllers');

router.post('/links/', client.postLinks);
router.post('/info/', client.postdescription);
router.post('/profile/', client.postProfile);
router.post('/contacts', client.postContacts);
router.post('/pid/', client.postPid);
router.get('/client/', client.getClient);

module.exports = router;
