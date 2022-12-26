const _ = require("lodash");

function makeUsersDb({ User }) {
  async function findOne(_filter, _options = {}) {
    const { populate, sort } = _options;
    const query = User.findOne(_filter);
    if (sort) query.sort(sort);
    _.forEach(populate || [], (p) => query.populate(p));
    return query.lean().exec();
  }

  async function insert(userData) {
    return User.create(userData);
  }

  return Object.freeze({
    insert,
    findOne,
  });
}

module.exports = makeUsersDb;
