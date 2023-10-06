const { Router } = require('express');
const logger = require('../middlewares/loggers/winston.logger');

const loggerRouter = Router();

loggerRouter.get('/', (req, res) => {
    logger.fatal('Fatal');
    logger.error('Error');
    logger.warn('Warn');
    logger.info('Info');
    logger.http('Http');
    logger.debug('Debug');
    return res.status(200).json({ status: 'Success', message: 'All logs' })
});

module.exports = loggerRouter;