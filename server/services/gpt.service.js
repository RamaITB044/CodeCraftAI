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
            prompt: prompt+"Code: ",
            temperature: 0.5,
            max_tokens: 2000,
        });
        console.log(completion.data);
        return completion.data.choices[0].text;
    }catch(error){
        console.log(error);
        return error;
    }
}

async function chatGpt(prompt) {
    try{
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `    You are the most advanced AI who knows everything about Coding.
                         ${prompt}
                   `,
            temperature: 0.5,
            max_tokens: 1000
        });

        if (completion.data.choices[0].finish_reason === 'length') {
            return completion.data.choices[0].text + '...*it costs a lot for me to speak more than this.*'
          } else {
            return completion.data.choices[0].text;
        }
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {gpt, chatGpt};