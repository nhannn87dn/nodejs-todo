const Joi = require('joi');
/**
 * validateTask
 * @param {object} taskBody
 * @returns {value, error}
 */
 const validateTask = (taskBody) => {
    schemaTask = Joi.object({
      name: Joi.string().required(),
      status: Joi.string().valid("To Do","In Progress"),
      userId: Joi.string().required()
    });
  
    return schemaTask.validate(taskBody);
  };


  /**
 * validateUser
 * @param {object} users
 * @returns {value, error}
 */
 const validateUser = (users) => {
    schemaUser = Joi.object({
      email: Joi.string().required(),
      password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$")),
    });
  
    return schemaUser.validate(users);
  };


module.exports = {
    validateTask,
    validateUser,
}