const express = require("express");
const router = express.Router();
const db = require("../models");
var QRCode = require("qrcode");
var QRImage = require("qr-image");

router.post("/new-track", (req, res) => {
  console.log(req.body)
  db.Track.create({
    UserId: req.body.UserId,
    code: req.body.code,
    local: req.body.local,
  }).then((newTrack) => {
    if (newTrack) {
      res.send(JSON.stringify(newTrack.id));
    }
  });
});

router.post("/new-QRCode", (req, res) => {
  QRCode.toDataURL(req.body.code).then((url) => {
    QRCode.toFile("./config/QRCode.png", req.body.code);
    res.send(JSON.stringify(url));
  });
})

router.post("/track/generate-code", (req, res) => {
  const url = req.body.code;
  const codeImage = QRImage.image(url, { type: "svg" });
  res.type("svg");
  codeImage.pipe(res);
});

router.get("/get-user-track", (req, res) => {
  db.Track.findAll({
    indlude: [db.Product],
  }).then((oneTrack) => {
    if (oneTrack === null) {
      res.send(JSON.stringify("falied"));
    } else {
      res.send(oneTrack);
    }
  });
});

router.post("/get-track", (req, res) => {
  db.Track.findOne({
    where: { id: req.body.id },
    include: [db.Product],
  }).then((oneTrack) => {
    if (oneTrack === null) {
      res.send(JSON.stringify("falied"));
    } else {
      res.send(oneTrack);
    }
  });
});

router.post("/delete-track", (req, res) => {
  db.Track.destroy({
    where: { id: req.body.id },
  });
});

module.exports = router;
