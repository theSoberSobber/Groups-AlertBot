// Approach
    // read gid of prev from info.txt
        // retreive metaData
        // check number of participants
            // left
                // 308 to the groups URL
            // full
                // create the group and init it
                // update the info file with the new gid    

module.exports = group = async () => {
    const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
    const { state } = useSingleFileAuthState('./sesi.json');
    const { readFile, writeFile } = require('fs/promises');

    const ws = makeWASocket({
        printQRInTerminal: true,
        browser: ["AlertBot", "AlertBot", "1.0"],
        auth: state
    })

    if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
    // __________________________________________________
    ws.ev.on('connection.update', async (update) => {
        const { connection } = update;
        if (connection === "open") {
            console.log("Connection Successful!");
            ws.sendMessage('918815065180@s.whatsapp.net', { text: 'Connected Successfully' })
        }
    })
    // __________________________________________________
    
    // check previous group's meta data
    
    // const file = await readFile('./info.txt', 'utf-8');
    // const f_gid = file[0];
    // console.log(f_gid);
    
    // const meta = await ws.groupMetadata("120363028646624852@g.us"); 
    // console.log(meta);

    // const jid = "120363028646624852@g.us";
    // ws.groupMetadata(jid).then(meta => console.log(meta.participants))

    // console.log(meta.participants)     
        
    // ws.ev.on('messages.upsert', async chatUpdate => {
    //     var messageObj = chatUpdate.messages[0];
    //     console.log(messageObj.key.remoteJid);
    // })
    
    
    // const initMembers = ["919770483089@s.whatsapp.net", "918815065180@s.whatsapp.net", "919667240912@s.whatsapp.net"];
    // const desc = `NOTICE GROUP ${groupNum}`
    // const group = await ws.groupCreate(`MANIT Notice Alerts #${groupNum}`, initMembers)
    // console.log ("created group with id: " + group.gid)
    // ws.sendMessage(group.id, { text: 'hello there' }) // say hello to everyone on the group

    // await ws.groupParticipantsUpdate(group.id, initMembers, "promote");
    // await ws.groupUpdateDescription(group.id, desc);
    // await ws.groupSettingUpdate(group.id, 'announcement');
    // await ws.groupSettingUpdate(group.id, 'locked');
}

if(require.main === module){
    group();
}