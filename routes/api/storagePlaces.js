const express = require('express');

const router = express.Router();

//@route   GET api/storageplaces 
router.get('/', (req, res) => res.send('Storage route'))

module.exports = router;