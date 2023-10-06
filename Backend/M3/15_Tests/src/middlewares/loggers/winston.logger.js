const winston = require('winston')
const dotenv = require('dotenv')
dotenv.config();


const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'green',
    },
};


const environment = process.env.NODE_ENV;
let logger;

if (environment.trim() == 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                ),
            }),
            new winston.transports.File({
                filename: './logger/errors.log',
                level: 'error',
                format: winston.format.simple(),
            }),
        ],
    });
} else if (environment.trim() == 'development') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                ),
            }),
            new winston.transports.File({
                filename: './logger/errors.log',
                level: 'error',
                format: winston.format.simple(),
            }),
        ],
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                ),
            }),
        ],
    });
}

module.exports = logger;