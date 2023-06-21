const express = require('express');
const talkersRead = require('../utils/fsTalker');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const talkers = await talkersRead();
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await talkersRead();
  const { id } = req.params;
  const searchId = talkers.find((talker) => talker.id === Number(id));

  if (!searchId) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(200).json(searchId);
});

module.exports = router;
