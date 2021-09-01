var express = require('express');
var router = express.Router();
const api = require('../DAL/api');
const logger = require('../logger');
const {validateData} = require('../utilities/validations')

const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };

//Get all orders from the last day
router.get('/', catchAsync(async (req, res, next) => {
    logger.info("incoming request on route /orders method = GET")
    const response = await api.getLastDayOrders()
    logger.info(`response DATA ${JSON.stringify(response)}`)
    res.status(200).json({
        status: 'success',
        data: response,
    });
})); 


//Save new order
router.post('/', validateData,  catchAsync (async (req, res, next) => {
        logger.info(`incoming request on route /orders method = POST attached DATA: ${JSON.stringify(req.body)}`)
        const response = await api.postOrder(req.body)
        logger.info(`response DATA ${JSON.stringify(response)}`)
        res.status(200).json({
            status: 'success',
            data: response,
        });
}))

module.exports = router;