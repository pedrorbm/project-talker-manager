const fs = require('fs/promises');

const readTalker = async () => {
  const readFile = await fs.readFile('./src/talker.json', 'utf-8');
  const talkers = JSON.parse(readFile);
  return talkers;
};

const writeTalker = async (file) => {
  const writeFile = await fs.writeFile('./src/talker.json', JSON.stringify(file));
  return writeFile;
};

module.exports = { readTalker, writeTalker };
