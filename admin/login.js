module.exports = login = async (req, res) => {
    const body = req.body;
    const user = body.usr;
    const pwd = body.pswd;
    console.log(user);
    console.log(pwd);
    res.send("HMMM");
}