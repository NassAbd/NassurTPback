const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

// cors from *
app.use(cors({ origin: "*" }));

const PORT = 8080;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/indivtp", {})
  .then(() => console.log("Connected to MongoDB"));

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
