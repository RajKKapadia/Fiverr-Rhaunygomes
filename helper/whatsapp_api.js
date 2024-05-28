const axios = require('axios');
require('dotenv').config();

const sendWhatsappMessage = async (message, senderId, instance_id) => {
    const data = {
        number: senderId,
        type: "text",
        message: message,
        instance_id: instance_id,
        access_token: process.env.ACCESS_TOKEN
    };
    try {
        const url = 'https://marketingmaill.com/api/send';
        const response = await axios.post(url, data)
        console.log(response.data);
    } catch (error) {
        console.log(`Error at sendWhatsappMessage --> ${error}`);
    }
};

module.exports = {
    sendWhatsappMessage
};
