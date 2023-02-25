const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);
// app.use("../../client/public/", express.static("public"));

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//   console.log(chalk.green("Production"));
// } else {
//   console.log(chalk.green("Development"));
// }

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.grey("MongoDB запущен!"));
    app.listen(PORT, () => {
      console.log(chalk.grey(`Сервер запущен на порту ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.purple(error.message));
    process.exit(1);
  }
}

start();
