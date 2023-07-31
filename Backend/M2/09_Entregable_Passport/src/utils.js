const { fileURLToPath } = require('url');
const { dirname } = require('path');
const bcrypt = require('bcrypt');


export const createHash = async (password) => {
    await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = async (user, password) => {
    await bcrypt.compare(password, user.password)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

module.exports = __dirname;