const {jidNormalizedUser} = require("@adiwajshing/baileys");
const connect = async (ws) => {
    if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id);
    // __________________________________________________
    ws.ev.on("connection.update", async (update) => {
        const { connection } = update;
        try {
            if (connection === "open") {
                console.log("Connection Successful!");
                await ws.sendMessage("918815065180@s.whatsapp.net", {
                    text: "Connected Successfully",
                });
            }
            else if (connection === "close") {
                console.log("Connection Closed!");
                console.log("attempting connection again...")
                await connect(ws);
            }
        } catch (e) {
            console.log("Connection Error!" + e)
            console.log("attempting connection again...")
            console.log("stop the script if you understand the above error")
            await connect(ws);
        }
    })
}
module.exports = {
    connect
}