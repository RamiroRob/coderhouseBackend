const usersService = require('../services/users.service');

const getUsers = async (req, res) => {

    try {
        const users = await usersService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUserAccounts = async (req, res) => {
    try {
        await usersService.deleteInactiveUsers();
        res.status(200).json({ message: 'Cuentas de usuarios inactivos eliminadas' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOneUser = async (req, res) => {
    try {

        const { id } = req.params;
        await usersService.deleteOneUser(id);
        res.status(200).json({ message: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    deleteUserAccounts,
    deleteOneUser
}
