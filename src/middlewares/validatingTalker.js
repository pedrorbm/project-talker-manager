const validatingToken = (req, res, next) => {
  const authorization = 'authorization';
  const token = req.header('authorization');

  if (!(authorization in req.headers)) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (typeof (token) !== 'string' || token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
};

const validatingName = (req, res, next) => {
  const key = 'name';
  const { name } = req.body;

  if (!(key in req.body)) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
};

const validatingAge = (req, res, next) => {
  const key = 'age';
  const { age } = req.body;

  if (!(key in req.body)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (typeof (age) !== 'number' || age < 18 || Number.isInteger(age) === false) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  return next();
};

const validatingTalk = (req, res, next) => {
  const key = 'talk';

  if (!(key in req.body)) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } 

  return next();
};

const validatingWatchedAt = (req, res, next) => {
  const key = 'watchedAt';
  const { watchedAt } = req.body.talk;
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!(key in req.body.talk)) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(regex.test(watchedAt))) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  return next();
};

const validatingRate = (req, res, next) => {
  const key = 'rate';
  const { rate } = req.body.talk;

  if (!(key in req.body.talk)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number.isInteger(rate) === false || rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  return next();
};

module.exports = {
  validatingToken,
  validatingName,
  validatingAge,
  validatingTalk,
  validatingWatchedAt,
  validatingRate,
};
