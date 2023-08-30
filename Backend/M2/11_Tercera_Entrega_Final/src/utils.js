// const { fileURLToPath } = require('url');
// const { dirname } = require('path');
const bcrypt = require('bcrypt');


const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

module.exports = {
    // __dirname,
    createHash,
    isValidPassword
}