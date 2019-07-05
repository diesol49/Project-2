var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
  //get routes
  app.get("/", authController.welcome);

  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);
  
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  
  app.get("/logout", authController.logout);

  app.get("/form", authController.form);
  //everything else beside the link will result in errror. disabled for a reason
  // app.get("*", authController.error);
  //post routes
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
