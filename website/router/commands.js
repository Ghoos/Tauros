const express = require("express");
const router = express.Router();
const passport = require("passport");
const CheckAuth = require("../auth/CheckAuth");

router
  .get("/", function(req, res) {
    res.render("commands.ejs", {
      status: req.isAuthenticated()
        ? `${req.user.username}#${req.user.discriminator}`
        : "Login",
      client: req.bot.user,
      commands: req.bot.commands,
      categories: [ ...new Set(req.bot.commands.filter(x => x.help.category).map(x => x.help.category))],
      user: req.user,
      login: req.isAuthenticated() ? "yes" : "no",
      invite: `https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1`
    });
  })
  .get(
    "/login",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/profile");
    }
  )
  .get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
  });

module.exports = router;
