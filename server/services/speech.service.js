const sdk = require('microsoft-cognitiveservices-speech-sdk');
const { Buffer } = require('buffer');
const { PassThrough } = require('stream');
const fs = require('fs');
require("dotenv").config();
const sound = require('sound-play');
const path = require('path');

const textToSpeech = async (text) => {
    let filename = "voice.mp3";
    // convert callback function to promise
    return new Promise((resolve, reject) => {

        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
        // speechConfig.speechSynthesisOutputFormat = 5; // mp3
        speechConfig.speechRecognitionLanguage = "en-US";
        //use the original Cortana voice
        speechConfig.speechSynthesisVoiceName = "en-US-DavisNeural";

        let audioConfig = null;

        if (filename) {
            audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
        }

        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        let ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
        <voice name="en-US-JennyNeural">
        <mstts:express-as style="hopeful">
        <prosody volume="+100.00%" rate="+10.00%">
        ${text}
        </prosody>
        </mstts:express-as>
        </voice>
        </speak>`;

        synthesizer.speakSsmlAsync(
            ssml,
            result => {

                const { audioData } = result;

                synthesizer.close();

                if (filename) {

                    // return stream from file
                    const filePath = path.resolve(__dirname, '..', 'voice.mp3');
                    sound.play(filePath).then(() => {
                        resolve();
                    }).catch(error => {
                        reject(error);
                    });

                } else {

                    // return stream from memory
                    sound.play(audioData, { player: 'mpg123' }).then(() => {
                        resolve();
                    }).catch(error => {
                        reject(error);
                    });
                }
            },
            error => {
                synthesizer.close();
                reject(error);
            });
    });
};

// let execute = async () => {
//     await textToSpeech("So Bob.....I have a simple JavaScript question for you......Can you explain me what is Hoisting and also can you write some code to explain it?", "voice.mp3");
// };

// execute();

module.exports = {
    textToSpeech
};