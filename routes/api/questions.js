const express = require('express');
const router = express.Router();

// @route GET api/questions/test
// @desc Tests questions route
// @access public

router.get('/test', (req, res) => res.json({ msg: 'questions works' }));

module.exports = router;
