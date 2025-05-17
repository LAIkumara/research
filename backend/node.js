const axios = require('axios');

async function getSentiment(text) {
    try {
        const response = await axios.post('http://localhost:5001/predict', { text });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

getSentiment("This is amazing!");