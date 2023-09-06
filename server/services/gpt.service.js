const {
    Configuration,
    OpenAIApi,
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
    messages.forEach((message) => {
        convo += `${message.role}: ${message.content}\n`;
    });
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `   You are an AI chat bot made by Codz an AI powered coding platform. Don't provide any code. Just give me the answer to the question.\n
                        Here is the user's code that you will be dealing with. \n${code}\n              
                        ${convo}\n\n
                        Now type your response here and dont start with "bot: ":\n
                   `,
            temperature: 0.5,
            max_tokens: 3000
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

async function newChatGpt(code, messages) {
    let initialPrompt = {
        role: "system",
        content: "You are an AI bot created by developers at Codz. You are strictly not allowed to provide any type of code or code snippets. You will help with the user's code and coding related questions. You will be working with the user's code: "+code+" You are strictly allowed to provide help with coding related question only and nothiing else!"
    }
    messages.unshift(initialPrompt);
    console.log(messages);
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.6,
            max_tokens: 1000
        });

        if (completion.data.choices[0].finish_reason === 'length') {
            console.log(completion.data.choices[0].message.content)
            return completion.data.choices[0].message.content + '...*it costs a lot for me to speak more than this.*'
        } else {
            console.log(completion.data.choices[0].message.content)
            return completion.data.choices[0].message.content;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function codeGpt(prompt){
    try {
        let conversationLog = [{ role: "system", content: "You are an intelligent coding bot made by the developers at Codz. You are allowed to provide the code only You should not provide any explanation before or after the code" }];
        conversationLog.push({role: "user", content: prompt+"Code: \n"});
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversationLog,
            temperature: 0,
            max_tokens: 1000
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    gpt,
    chatGpt,
    newChatGpt,
    codeGpt
};