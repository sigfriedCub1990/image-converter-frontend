const crypto = require("node:crypto");

function makeLoginUser({ userDb }) {
  return async function loginUser(userData) {
    const { email, password } = userData;

    if (!email) {
      return Promise.reject(new Error("Email is required"));
    }

    if (!password) {
      return Promise.reject(new Error("Password is required"));
    }

    const existingUser = await userDb.findOne({ email });

    if (!existingUser) {
      return Promise.reject(new Error(`There is no User with email ${email}`));
    }

    try {
      const hash = crypto.createHash("sha256");
      const hashedPassword = hash.update(password).digest("hex");
      if (existingUser.password !== hashedPassword) {
        return Promise.reject(
          new Error("Username or password incorrect, try again.")
        );
      }
      return existingUser;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = makeLoginUser;
