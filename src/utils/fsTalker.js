const fs = require('fs/promises');

const readTalker = async () => {
  const readFile = await fs.readFile('./src/talker.json', 'utf-8');
  const talkers = JSON.parse(readFile);
  return talkers;
};

module.exports = readTalker;
