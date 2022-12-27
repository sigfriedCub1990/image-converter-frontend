const crypto = require("node:crypto");

function makeRegisterUser({ userDb }) {
  return async function registerUser(userData) {
    const { email, password } = userData;

    if (!email) {
      return Promise.reject(new Error("Email is required"));
    }

    if (!password) {
      return Promise.reject(new Error("Password is required"));
    }

    const existingUser = await userDb.findOne({ email: userData.email });

    if (existingUser) {
      return Promise.reject(
        new Error(`There is already an User with email ${existingUser.email}`)
      );
    }

    try {
      const hash = crypto.createHash("sha256");
      const hashedPassword = hash.update(password).digest("hex");
      const user = await userDb.insert({
        ...userData,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = makeRegisterUser;
