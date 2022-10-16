## Alert Bot
This is a project that generates dynamic groups that always have bot in them. <br />
The links are dynamic so, even if your college is not on AlertBot yet, just go to https://alert-bot.vercel.app/[yourCollegeName]/group to get a BOT regsitered group for your college! <br />

---
***NOTE*** - the bot won't work until a parser for your college site is written, please write a parser for your college at https://github.com/theSoberSobber/AlertBot or contact @Pavit.

---

## Steps to run:
    - 1) git clone
    - 2) "yarn" to install dependencies
    - 3) "yarn start" --> launches the api at the available port (default 3000) on your localhost
    - 4) vist the endpoint [collegeName]/group to get redirected to the lastest group
        - /groupIds --> JSON that has the groupIds currently monitored by the bot 
        - / --> CC page
---

Since vercel doesn't support Websockets, these links won't work, unfortuantely. <br />
If anyone knows any free serverless (we only need it as an api) hosting provider that supports websockets then please open an issue for the same.

---

Old Vercel Links <br />
https://alert-bot.vercel.app/ <br />
https://alert-bot.vercel.app/manit/group <br />
https://alert-bot.vercel.app/dtu/group  etc...<br />
https://alert-bot.vercel.app/groupIds <br />
