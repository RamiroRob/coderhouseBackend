const EnumErrors = require('../../utils/errors/enum.errors');

const errors = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EnumErrors.INVALID_TYPES_ERROR:
            res.json({ status: "error", error: error.name });
            break;

        default:
            res.json({ status: "error", error: "Unhandled error" });
    }
};

module.exports = errors;
