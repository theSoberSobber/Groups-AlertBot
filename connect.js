const {jidNormalizedUser} = require("@adiwajshing/baileys");
const connect = async (ws) => {
    if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id);
    // __________________________________________________
    ws.ev.on("connection.update", async (update) => {
        const { connection } = update;
        if (connection === "open") {
        console.log("Connection Successful!");
        ws.sendMessage("918815065180@s.whatsapp.net", {
            text: "Connected Successfully",
        });
        }
    })
}
module.exports = {
    connect
}