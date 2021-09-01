const { AppError} = require("./customeErrors")

const checkNumbers = (val) => {
    return /\D/.test(val)
}

async function validateData(req, res, next) {
    try{
        const data = req.body.data
        if (!data) {
            throw new AppError ('The request must have data', 400)
        }
        if (!data.customerId || !data.orderDate || !data.orderCity || !data.orderAddress || !data.products) {
            throw new AppError ('Either filed name is incorrect, field data is empty or field is missing', 400)
        }
        if (data.orderCity.length > 40 || data.orderCity.length < 2) {
            throw new AppError ('Length of the field orderCity is incorrect', 400)
        }
        if (data.orderAddress.length > 200 || data.orderAddress.length < 5){
            throw new AppError ('Length of the field orderAddress is incorrect', 400)
        }
        if (checkNumbers(data.customerId || data.customerId < 1)) {
            throw new AppError ('Invalid customerId', 400)
        }
        if (/[^a-zA-Z]/.test(data.orderCity.split(' ').join(""))) {
            throw new AppError ('Invalid city name', 400)
        }
        if (isNaN(Date.parse(data.orderDate))) {
            throw new AppError ('date is incorrect', 400)
        }
        data.products.forEach(product => {
            if (!product.productId || !product.quantity) {
                throw new AppError ('Either filed name is incorrect, field data is empty or field is missing', 400)
            }
            if (checkNumbers(product.productId) || checkNumbers(product.quantity)){
                throw new AppError ('Invalid productId/quantity', 400)
            }
            if (product.productId > 5 || product.productId < 1) {
                throw new AppError ('Invalid productId', 400)
            }
        });
        next()
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    validateData
}