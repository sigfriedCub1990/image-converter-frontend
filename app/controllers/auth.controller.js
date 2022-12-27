const { authService } = require("../use-cases/auth");

const authController = Object.freeze({
  registerUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.registerUser({
        email,
        password,
      });

      res.json({ id: user._id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
});

module.exports = authController;
