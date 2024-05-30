const express = require('express');
const router = express.Router();

const { sendWhatsappMessage } = require('../helper/whatsapp_api');
const { detectIntent } = require('../helper/dialogflow_api');

router.post('/receiveMessage', async (req, res) => {
    try {
        const instance_id = req.body.instance_id;
        if (req.body.data.data.hasOwnProperty('messages') && req.body.data.data.type === 'notify') {
            const messages = req.body.data.data.messages[0];
            console.log(JSON.stringify(messages, 2, ' '));
            const id = messages.key.remoteJid;
            const senderId = id.match(/\d+/)[0];
            let query = undefined;
            if (messages.hasOwnProperty('message')) {
                if (messages.message.hasOwnProperty('conversation')) {
                    query = messages.message.conversation;
                }
                if (query === undefined || messages.message.hasOwnProperty('extendedTextMessage')) {
                    query = messages.message.extendedTextMessage.text;
                }
                if (query !== undefined && senderId !== undefined) {
                    console.log(senderId, query);
                    const intentData = await detectIntent(query, `abcdefgh-${senderId}-abcdefgh`);
                    console.log(JSON.stringify(intentData, 2, ' '));
                    if (intentData.status === 0 || intentData.text === '') {
                    } else {
                        sendWhatsappMessage(intentData.text, senderId, instance_id);
                        res.sendStatus(200);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = {
    router
};
