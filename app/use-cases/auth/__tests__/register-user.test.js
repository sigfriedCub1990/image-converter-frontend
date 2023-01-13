const mongoose = require("mongoose");
const authService = require("../");

describe("Register User tests", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/test");
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
  });

  test("should register user", async () => {
    const fakeUser = {
      email: "paul@beatles.com",
      password: "penny_lane",
    };
    const user = await authService.registerUser(fakeUser);

    expect(user._id).toBeTruthy();
  });
});
