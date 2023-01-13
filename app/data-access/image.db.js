const _ = require("lodash");

function makeImageDb({ Image }) {
  async function findOne(_filter, _options = {}) {
    const { populate, sort } = _options;
    const query = Image.findOne(_filter);
    if (sort) query.sort(sort);
    _.forEach(populate || [], (p) => query.populate(p));
    return query.lean().exec();
  }

  async function insert(imgData) {
    return Image.create(imgData);
  }

  async function update(_filter, _imageInfo) {
    return Image.findOneAndUpdate(_filter, _imageInfo);
  }

  return Object.freeze({
    insert,
    findOne,
    update,
  });
}

module.exports = makeImageDb;
