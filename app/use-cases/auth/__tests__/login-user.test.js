const mongoose = require("mongoose");
const authService = require("../");

describe("Login User tests", () => {
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

  test("should login user", async () => {
    const fakeUser = {
      email: "paul@beatles.com",
      password: "penny_lane",
    };
    await authService.registerUser(fakeUser);

    const loggedUser = await authService.loginUser(fakeUser);

    expect(loggedUser._id).toBeTruthy();
  });

  // TODO: Figure how to test errors
  // test("should throw generic message if password is incorrect", async () => {
  //   const fakeUser = {
  //     email: "john@beatles.com",
  //     password: "helter_skelter",
  //   };
  //   await authService.registerUser(fakeUser);

  //   async function login() {
  //     await authService.loginUser({
  //       ...fakeUser,
  //       password: "1234",
  //     });
  //   }

  //   expect(login).toThrowErrorMatchingInlineSnapshot();
  // });
});
