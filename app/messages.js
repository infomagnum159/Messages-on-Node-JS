const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = "messages";

router.get("/", (req, res) => {
    let countFiles = 5;
    let messageList = [];

    fs.readdir(path, (err, files) => {
        if (err) console.log(err);

        files.slice(Math.max(files.length - countFiles, 0)).forEach(file => {
            const fileName = (path + '/' + file);
            messageList.push(JSON.parse(fs.readFileSync(fileName)));
        });

        res.send(messageList)
    });
});

router.post("/", (request, response) => {
    const addMessage = (message) => {
        message.id = new Date().toJSON();
        fs.writeFileSync('messages/' + message.id, JSON.stringify(message));
        return message;
    };
    response.send(addMessage(request.body));
});


module.exports = router;