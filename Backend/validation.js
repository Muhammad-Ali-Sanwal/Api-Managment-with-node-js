import Joi from "joi";

export const ValidatePerson = (person) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).trim().required(),
    age: Joi.number().min(3).max(100).required(),
    fatherName: Joi.string().min(3).max(20).trim().required(),
    CGPA: Joi.number().min(2).max(4).required(),
    salary: Joi.number().min(40000).max(2000000).required(),
    passingYear: Joi.number().min(2000).required(),
  });
  return schema.validate(person);
};
