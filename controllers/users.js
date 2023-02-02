const User = require('../models/user');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.create({ name, email, password })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.send({ message: err.message }));
};

const getMyInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById({ _id: userId })
    .then((myInfo) => res.status(200).send(myInfo))
    .catch((err) => res.send({ message: err.message }));
};

const updateMyInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    { _id: userId },
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((myUpdInfo) => res.status(200).send(myUpdInfo))
    .catch((err) => res.send({ message: err.message }));
};

module.exports = {
  createUser,
  getMyInfo,
  updateMyInfo,
};
