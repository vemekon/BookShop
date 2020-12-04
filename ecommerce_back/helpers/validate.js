const Joi = require("@hapi/joi");

exports.loginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .min(4)
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.signupValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .min(4)
      .required(),
    password: Joi.string()
      .min(4)
      .required(),
    role: Joi.number().default(0),
    history: Joi.string().min(4)
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.createCatagoryValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
