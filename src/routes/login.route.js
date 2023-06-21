const express = require('express');
const createToken = require('../middlewares/createToken');

const router = express.Router();

router.post('/login', (req, res) => {
  const token = createToken();
  res.status(200).json({ token: `${token}` });
});

module.exports = router;
