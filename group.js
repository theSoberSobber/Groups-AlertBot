// Approach
    // read gid of prev from info.txt
        // retreive metaData
            // check number of participants
                // left
                    // 308 to the groups URL
                // full
                    // create the group and init it
                    // update the info file with the new gid

const maxLimit = 510;
module.exports = group = async (ws) => {
  // check previous group's meta data
  const { readFile, writeFile } = require("fs/promises");
  let file = await readFile("./info.json", "utf-8");
  file = JSON.parse(file);
  const f_gid = file.groupIds[file.groupIds.length - 1];

  const meta = await ws.groupMetadata(f_gid);
  const lenGroup = meta.participants.length;

  let code;
  code = await ws.groupInviteCode(f_gid);

  if (lenGroup <= maxLimit) {
    return code;
  }

  // otherwise create the group
  const groupNum = file.groupIds.length+1;
  const initMembers = [
    "919770483089@s.whatsapp.net",
    "918815065180@s.whatsapp.net",
    "919667240912@s.whatsapp.net",
  ];
  const desc = `NOTICE GROUP ${groupNum}
Always Working group link - https://alert-bot.vercel.app/group
For errors/request contact @Pavit`;
  const group = await ws.groupCreate(`MANIT Notice Alerts G${groupNum}`, initMembers);
//   console.log(group); --> inspect using this how to change profile photo
  // add it's gid to the info.json file
  await file.groupIds.push(group.id);
  await writeFile('./info.json', JSON.stringify(file));

  // perform init operations on it
  await ws.groupParticipantsUpdate(group.id, initMembers, "promote");
  await ws.groupUpdateDescription(group.id, desc);
  await ws.groupSettingUpdate(group.id, "announcement");
  await ws.groupSettingUpdate(group.id, "locked");

  // now get and return the invite code
  code = await ws.groupInviteCode(group.id);
  return code;
};


// for testing purposes
if (require.main === module) {
    const {default: makeWASocket, useSingleFileAuthState} = require("@adiwajshing/baileys");
    const { state } = useSingleFileAuthState("./sesi.json");
    const ws = makeWASocket({
        printQRInTerminal: true,
        browser: ["AlertBot", "AlertBot", "1.0"],
        auth: state,
    });

    const test = async () => {
        const {connect} = require('./connect.js');
        await connect(ws);
        await group(ws);
    }
    test();
}
