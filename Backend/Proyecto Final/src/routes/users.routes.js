const { Router } = require('express');
const { getUsers, deleteUserAccounts } = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.delete('/', deleteUserAccounts);



module.exports = usersRouter;

