const {
    Configuration,
    OpenAIApi
} = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function gpt(prompt) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt + "Code: ",
            temperature: 0.5,
            max_tokens: 2000,
        });
        console.log(completion.data);
        return completion.data.choices[0].text;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function chatGpt(code, messages) {
    let convo = "";
    convo += `Below is the user's code that you will be dealing with. \n${code}\n`;
    messages.forEach((message) => {
        convo += `${message.author}: ${message.message}\n`;
    });
    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: `    You are an AI chat bot made by Codz an AI powered coding platform. Don't provide any code. Just give me the answer to the question.\n
                         ${convo}\n\n
                         If the above convo contains anything unrelated to coding, just say "Sorry, you can't ask me anything unrelated to coding!", now type your response here and dont start with "bot: ":\n
                   `,
            temperature: 0.5,
            max_tokens: 2000
        });

        if (completion.data.choices[0].finish_reason === 'length') {
            return completion.data.choices[0].text + '...*it costs a lot for me to speak more than this.*'
        } else {
            return completion.data.choices[0].text;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    gpt,
    chatGpt
};