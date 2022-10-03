import joi from 'joi';

const phonePattern = new RegExp('^[0-9]{10,11}$');
const cpfPattern = new RegExp('^[0-9]{11}$');

const customersSchema = joi.object({
    name: joi.string().trim().empty('').required(),
    phone: joi.string().pattern(phonePattern).required(),
    cpf: joi.string().pattern(cpfPattern).required(),
    birthday: joi.string().isoDate().required()
});

export { customersSchema };