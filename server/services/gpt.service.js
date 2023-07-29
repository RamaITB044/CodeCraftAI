const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function gpt(prompt){
    try{
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 100
        });
        // console.log(resp.data);
        return completion.data.choices[0].text;
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {gpt};