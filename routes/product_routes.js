const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new-product", (req, res) => {
  db.Product.create({
    name: req.body.product,
    TrackId: req.body.TrackId
  }).then((newProduct) => {
    if (newProduct) {
      res.send(JSON.stringify("Sucesso"));
    } else {
      res.send(JSON.stringify("Falha"));
    }
  });
});

router.get("/get-user-product", (req, res) => {
  db.Product.findAll({}).then((oneProduct) => {
    if (oneProduct === null) {
      res.send(JSON.stringify("falied"));
    } else {
      res.send(oneProduct);
    }
  });
});

module.exports = router;
