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

  return Object.freeze({
    insert,
    findOne,
  });
}

module.exports = makeImageDb;
