const server = require('express');
const Database = require('../database');

const router = server.Router();

router.post('/', (req, res) => {
    const {receiver} = req.body;

})

module.exports = router;