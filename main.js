const express = require("express");
const { readFile } = require("fs/promises");
const path = require("path");

const app = express();

const {default: makeWASocket, useSingleFileAuthState} = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState("./sesi.json");

const ws = makeWASocket({
    printQRInTerminal: true,
    browser: ["AlertBot", "AlertBot", "1.0"],
    auth: state,
});

const {connect} = require('./connect.js');
connect(ws);

app.listen(process.env.PORT || 3000);
// _____________________________________
app.get("/", async (req, res) => {
  res.status(200).send("AlertBot@2022");
});

app.get("/:name/group", async (req, res) => {
  const name = req.params.name.toLowerCase();
  const code = await require('./group.js')(ws, name);
  // make a link and 302 onto that
  const link = "https://chat.whatsapp.com/"+code;
//   console.log(link);
  res.redirect(link);
});

app.get("/groupIds", async (req, res) => {
  let file = await readFile(path.join(__dirname, "info.json"), "utf-8");
  file = await JSON.parse(file);
  console.log(file);
  res.json(file);
});