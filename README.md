## Alert Bot
This is a project that generates dynamic groups that always have bot in them.

## Steps to run:
    - 1) git clone
    - 2) "yarn" to install dependencies
    - 3) "yarn start" --> launches the api at the available port (default 3000) on your localhost
    - 4) vist the endpoint /group to get redirected to the lastest group
        - /groupIds --> JSON that has the groupIds currently monitored by the bot 
        - / --> CC page
---

Since vercel doesn't support Websockets, these links won't work, unfortuantely. <br />
If anyone knows any free serverless (we only need it as an api) hosting provider that supports websockets then please open an issue for the same.

---

Old Vercel Links <br />
https://alert-bot.vercel.app/ <br />
https://alert-bot.vercel.app/group <br />
https://alert-bot.vercel.app/groupIds <br />
