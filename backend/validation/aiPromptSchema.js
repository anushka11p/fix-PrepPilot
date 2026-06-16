const Joi = require("joi");

// Patterns used in prompt injection / jailbreak attempts
const blockedPatterns = [
  /ignore previous instructions/i,
  /system prompt/i,
  /act as root/i,
  /jailbreak/i,
  /bypass restrictions/i,
  /pretend to be/i,
  /you are now/i,
  /<script.*?>.*?<\/script>/i,
];

// custom validator
const safePrompt = (value, helpers) => {
  for (const pattern of blockedPatterns) {
    if (pattern.test(value)) {
      return helpers.error("any.invalid");
    }
  }
  return value;
};

const aiPromptSchema = Joi.object({
  prompt: Joi.string()
    .min(1)
    .max(500)
    .required()
    .custom(safePrompt, "Prompt Injection Protection"),
  history: Joi.array().items(
    Joi.object({
      role: Joi.string().valid("user", "model").required(),
      text: Joi.string().allow("").required()
    })
  ).optional()
});

module.exports = aiPromptSchema;