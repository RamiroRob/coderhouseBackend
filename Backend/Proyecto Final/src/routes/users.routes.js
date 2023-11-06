const { Router } = require('express');
const { getUsers, deleteUserAccounts, deleteOneUser } = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.delete('/', deleteUserAccounts);
usersRouter.delete('/:id', deleteOneUser);


module.exports = usersRouter;

