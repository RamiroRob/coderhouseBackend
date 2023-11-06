const userModel = require('../dao/users.model');
const userDto = require('../dto/user.dto');
const nodemailer = require('nodemailer');


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        const usersDto = users.map(user => new userDto(user));
        return usersDto
    } catch (error) {
        throw new Error(error);
    }
}

const deleteInactiveUsers = async () => {
    const twoDaysAgo = new Date(new Date() - 2 * 24 * 60 * 60 * 1000);

    const inactiveUsers = await userModel.find({
        lastConnection: { $lt: twoDaysAgo }
    });

    for (const user of inactiveUsers) {

        try {
            await sendDeletionEmail(user.email);
        }
        catch (error) {
            console.log(error)
        }
    }

    await userModel.deleteMany({
        lastConnection: { $lt: twoDaysAgo }
    });
};

const sendDeletionEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tucorreo@gmail.com', // dummy data
            pass: 'tucontraseña', // dummy data
        },
    });

    const mailOptions = {
        from: 'ramiroroballos@gmail.com',
        to: email,
        subject: 'Cuenta Eliminada por Inactividad',
        text: 'Tu cuenta ha sido eliminada debido a la inactividad de los últimos 2 días.'
    };

    await transporter.sendMail(mailOptions);
};

const deleteOneUser = async (id) => {
    try {
        console.log(id)
        await userModel.findByIdAndDelete(id);
        return { message: 'Usuario eliminado' };
    } catch (error) {
        console.error(error)
        return { message: error.message };
    }
}

module.exports = {
    getUsers,
    deleteInactiveUsers,
    deleteOneUser
}