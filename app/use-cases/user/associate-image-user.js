function makeAssociateImageAndUser({ userDb, imageDb }) {
  return async ({ userId, imageUUID, resizedResolution }) => {
    try {
      const insertedImage = await imageDb.insert({
        uuid: imageUUID,
        status: "enqueued",
        owner: userId,
        resizedResolution,
      });

      const user = await userDb.findOne({ _id: userId });
      const imageId = insertedImage._id.toString();

      user.images.push(imageId);
      await userDb.update({ _id: user._id }, user);

      return imageId;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeAssociateImageAndUser;
