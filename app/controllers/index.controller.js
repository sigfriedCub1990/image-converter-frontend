const indexController = Object.freeze({
  mainPage: (req, res) => {
    const isLoggedIn = req.session && req.session.userId;
    res.render("index", { isLoggedIn });
  },
});

module.exports = indexController;
