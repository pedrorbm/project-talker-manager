const validatingKeyEmail = (req, res, next) => {
  const key = 'email';

  if (key in req.body) {
    next();
  } else {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
};

const validatingEmail = (req, res, next) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (regex.test(email)) {
    next();
  } else {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatingKeyPassword = (req, res, next) => {
  const key = 'password';
  
  if (key in req.body) {
    next();
  } else {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
};

const validatingPassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length >= 6) {
    next();
  } else {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = {
  validatingKeyEmail,
  validatingEmail,
  validatingKeyPassword,
  validatingPassword,
};
