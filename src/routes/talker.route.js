const express = require('express');
const talkersRead = require('../utils/fsTalker');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const talkers = await talkersRead();
  res.status(200).json(talkers);
});

module.exports = router;
