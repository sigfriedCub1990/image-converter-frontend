const { authService } = require("../use-cases/auth");

const authController = Object.freeze({
  registerUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      await authService.registerUser({
        email,
        password,
      });

      res.redirect("/");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.loginUser({
        email,
        password,
      });

      req.session.userId = user._id;

      res.redirect("/");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
});

module.exports = authController;
