const { z } = require("zod");

const registerUserZod = z.object({
  name: z.string().min(4, "Length of the name should be minimum 4").trim(),
  email: z.string().email("Enter a valid email").trim(),
  password: z.string().trim(),
  profileImageUrl: z.string().url("Enter a valid URL").optional().trim()
});

const validateUserSignup = (req, res, next) => {
  try {
    registerUserZod.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};

module.exports = {
    validateUserSignup
}
