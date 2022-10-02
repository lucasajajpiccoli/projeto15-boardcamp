import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().empty('').required(),
    image: joi.string().pattern("^https?://").required(),
    stockTotal: joi.number().integer().greater(0).required(),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().integer().greater(0).required()
});

export { gamesSchema };