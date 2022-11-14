const express = require("express");
const { readFile } = require("fs/promises");
const path = require("path");

const app = express();

const {default: makeWASocket, useSingleFileAuthState} = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState("./sesi.json");

const pino = require('pino');

const ws = makeWASocket({
    logger: pino({ level: 'silent' }),
    browser: ["AlertBot", "AlertBot", "1.0"],
    auth: state,
});

const main = async () => {
    const { connect } = require('./connect.js');
    try {
      await connect(ws);
    } catch {
      console.log("Connection Error!");
      await connect(ws);
    }
}
main();

app.listen(process.env.PORT || 3000);
// _____________________________________
app.get("/", async (req, res) => {
  res.status(200).send("AlertBot@2022");
});

app.get("/:name/group", async (req, res) => {
  const name = req.params.name.toLowerCase();
  const code = await require('./group.js')(ws, name);
  // make a link and 302 onto that
  if (code){
    const link = "https://chat.whatsapp.com/"+code;
    res.redirect(link);
  }
  else {
    console.log("Code not generated!")
  }
});

app.get("/groupIds", async (req, res) => {
  let file = await readFile(path.join(__dirname, "info.json"), "utf-8");
  file = await JSON.parse(file);
  res.json(file);
});

app.get("/admin", async (req, res) => {
  res.sendFile(path.join(__dirname, "admin/index.html"));
});

app.post("/api/login", async (req, res) => {
  console.log(req);
  require("./admin/login.js")(req, res);
});