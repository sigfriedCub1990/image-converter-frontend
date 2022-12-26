const indexController = Object.freeze({
  mainPage: (_, res) => {
    res.render("index");
  },
});

module.exports = indexController;
