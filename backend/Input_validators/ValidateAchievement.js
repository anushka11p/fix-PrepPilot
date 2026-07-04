const { z } = require('zod');

const savedAchievementsSchema = z.object({
  unlockedAchievements: z.array(z.string(), {
    required_error: "unlockedAchievements must be an array",
    invalid_type_error: "unlockedAchievements must be an array of strings",
  }),
});

const validateSavedAchievements = (req, res, next) => {
  try {
    savedAchievementsSchema.parse(req.body);
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e.errors?.[0]?.message || 'Invalid input',
    });
  }
};

module.exports = {
  validateSavedAchievements,
};
