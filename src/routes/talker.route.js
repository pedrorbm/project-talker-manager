const express = require('express');
const { readTalker, writeTalker } = require('../utils/fsTalker');
const { validatingToken, validatingName, validatingAge, validatingTalk, validatingWatchedAt, 
  validatingRate, validatingTalker } = require('../middlewares/validatingTalker');

const router = express.Router();
router.use(express.json());

router.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

router.get('/talker/:id', validatingTalker, async (req, res) => {
  const talkers = await readTalker();
  const { id } = req.params;
  const searchId = talkers.find((talker) => talker.id === Number(id));

  return res.status(200).json(searchId);
});

router.post('/talker', validatingToken, validatingName, validatingAge, validatingTalk, 
validatingWatchedAt, validatingRate, async (req, res) => {
  const talkers = await readTalker();
  let acres = 0;
  talkers.map((talker) => {
    acres = talker.id;
    return acres;
  });
  
  if (talkers.some(({ id }) => id === acres)) {
    acres += 1;
  }

  req.body.id = acres;
  talkers.push(req.body);
  await writeTalker(talkers);

  return res.status(201).json(req.body);
});

router.put('/talker/:id', validatingToken, validatingName, validatingAge, validatingTalk, 
validatingWatchedAt, validatingRate, validatingTalker, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const search = talkers.find((talker) => talker.id === Number(id));

  search.name = req.body.name;
  search.age = req.body.age;
  search.talk.watchedAt = req.body.talk.watchedAt;
  search.talk.rate = req.body.talk.rate;
  await writeTalker(talkers);

  return res.status(200).json(search);
});

router.delete('/talker/:id', validatingToken, validatingTalker, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const search = talkers.filter((talker) => talker.id !== Number(id));
  await writeTalker(search);

  return res.status(204).end();
});

module.exports = router;
