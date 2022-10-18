// Approach
    // read gid of prev from info.txt
        // retreive metaData
            // check number of participants
                // left
                    // 308 to the groups URL
                // full
                    // create the group and init it
                    // update the info file with the new gid

const maxLimit = 500;
module.exports = group = async (ws, name) => {
  require('./alertBot.config.js');
  // check previous group's meta data
  const { readFile, writeFile } = require("fs/promises");
  let file;
  try {
    file = await readFile("./info.json", "utf-8");
  } catch (e){
    console.log("Error reading file!" + e)
    return;
  }

  file = JSON.parse(file);

  if(file[name]){
    // already exists
    const f_gid = file[name][file[name].length - 1];
    const meta = await ws.groupMetadata(f_gid);
    const lenGroup = meta.participants.length;
  
    let code;
    code = await ws.groupInviteCode(f_gid);
  
    if (lenGroup <= maxLimit) {
      return code;
    }
  } else {
    // first time or the group has exceeded so create new
    if(!file[name]){file[name] = []};
    const groupNum = file[name].length+1;
    global.desc = `NOTICE GROUP ${groupNum}
Always Working group link - ${base_uri}/${name}/group
Please check if your college is listed in the following list : ${site_uri}/colleges, if not please contact @Pavit
For errors/request contact @Pavit`;
    const group = await ws.groupCreate(`${name.toUpperCase()} Notice Alerts G${groupNum}`, initMembers);
    // add it's gid to the info.json file
    await file[name].push(group.id);
  
    await writeFile('./info.json', JSON.stringify(file));
  
    // perform init operations on it
    await ws.groupParticipantsUpdate(group.id, initMembers, "promote");
    await ws.groupUpdateDescription(group.id, desc);
    await ws.groupSettingUpdate(group.id, "announcement");
    await ws.groupSettingUpdate(group.id, "locked");
  
    // now get and return the invite code
    code = await ws.groupInviteCode(group.id);
    return code;
  }
};