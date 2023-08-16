const express = require("express");
const configureDB = require("./Config/database");
const router = require("./Config/routers");
const app = express()
const port = 3005;

configureDB();
app.use(express.json())
app.use("/", router)

app.listen(port, () => {
  console.log("Port is running on the port num", port)
})
