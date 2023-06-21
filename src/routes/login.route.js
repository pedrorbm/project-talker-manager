const express = require('express');
const createToken = require('../middlewares/createToken');
const { validatingKeyEmail, validatingEmail, validatingKeyPassword,
  validatingPassword } = require('../middlewares/validatingLogin');

const router = express.Router();
router.use(express.json());

router.post('/login', validatingKeyEmail, validatingEmail, validatingKeyPassword, 
validatingPassword, (req, res) => {
  const token = createToken();
  res.status(200).json({ token: `${token}` });
});

module.exports = router;
