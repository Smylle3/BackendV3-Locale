const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new-user", (req, res) => {
  db.User.create({
    name: req.body.name,
    password: req.body.password,
  }).then((newUser) => res.send(newUser));
});

router.post("/get-user", (req, res) => {
  db.User.findOne({
    where: { name: req.body.name, password: req.body.password },
    include: [db.Track]
  }).then((oneUser) => {
    if (oneUser === null) {
      res.send(JSON.stringify("falied"));
    } else {
      res.send(JSON.stringify(oneUser));
    }
  });
});

router.post("/update-user", (req, res) => {
  db.User.findOne({
    where: { id: req.body.id },
  }).then((oneUser) => {
    if (req.body.flag == 0) {
      if (oneUser.password !== req.body.oldPassword) {
        res.send(JSON.stringify("Senha atual incorreta!"));
      } else {
        if (req.body.newPassword === req.body.confirmPassword) {
          res.send(JSON.stringify("Senha alterada com sucesso!"));
          oneUser.password = req.body.newPassword;
          oneUser.save();
        } else {
          res.send(JSON.stringify("As senhas devem ser iguais!"));
        }
      }
    } else if (req.body.flag == 1) {
      oneUser.name = req.body.nameUser;
      oneUser.save();
      res.send(JSON.stringify(oneUser.name));
    }
  });
});

router.get("/all-users", (req, res) => {
  db.User.findAll({
    include: [db.Track],
  }).then((allUser) => res.send(allUser));
});

module.exports = router;
