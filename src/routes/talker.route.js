const express = require('express');
const { readTalker, writeTalker } = require('../utils/fsTalker');
const { validatingToken, validatingName, validatingAge, validatingTalk, 
  validatingWatchedAt, validatingRate } = require('../middlewares/validatingTalker');

const router = express.Router();
router.use(express.json());

router.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await readTalker();
  const { id } = req.params;
  const searchId = talkers.find((talker) => talker.id === Number(id));

  if (!searchId) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(200).json(searchId);
});

router.post('/talker', validatingToken, validatingName, validatingAge, validatingTalk, 
validatingWatchedAt, validatingRate, async (req, res) => {
  const talkers = await readTalker();
  let acres = 6;
  
  if (talkers.some(({ id }) => id === acres)) {
    acres += 1;
  }

  req.body.id = acres;
  talkers.push(req.body);
  await writeTalker(talkers);

  return res.status(201).json(req.body);
});

module.exports = router;
