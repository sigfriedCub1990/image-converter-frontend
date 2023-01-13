function makeAssociateImageAndUser({ userDb }) {
  return async ({ userId, imageId }) => {
    const user = await userDb.findOne({ _id: userId });
    user.images.push(imageId);
    await userDb.update({ _id: user._id }, user);
  };
}

module.exports = makeAssociateImageAndUser;
