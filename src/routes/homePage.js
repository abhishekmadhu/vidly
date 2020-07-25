const express = require('express');
const router = express.Router();

// Home/base route
router.get('/', (req, res) => {
    return res.status(200).send('Welcome!');
});

module.exports = router;