import joi from 'joi';

const pattern = new RegExp('^https?://');

const gamesSchema = joi.object({
    name: joi.string().trim().empty('').required(),
    image: joi.string().pattern(pattern).required(),
    stockTotal: joi.number().integer().greater(0).required(),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().integer().greater(0).required()
});

export { gamesSchema };