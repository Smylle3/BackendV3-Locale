const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const tables = require("./models");
const QRCode = require("qrcode")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

const userRoutes = require("./routes/user_routes");
app.use("/api/users", userRoutes);

const trackRoutes = require("./routes/track_routes");
app.use("/api/tracks", trackRoutes);

const productRoutes = require("./routes/product_routes");
app.use("/api/products", productRoutes);

tables.sequelize.sync().then(() => {
  app.get("/", (req, res) => {
    res.send("Server ON");
  });

  app.listen(port, () => {
    console.log(`Server ON: ${port}`);
  });
});
