const express = require("express");
const router = express.Router();
const { gpt } = require("../services/gpt.service");
const User = require("../models/user.model");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/prompt", async (req, res) => {
    try{
        const resp = await gpt(req.body.prompt);
        return res.status(200).json({text: resp});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});

router.post("/optimize", async (req, res) => {
    // const magicId = req.magicId;
    try {
        // const user = User.find({ magic_id: magicId });
        // if (!user) {
        //     return res.status(401).json({ error: "User not found" });
        // }

        // //check if user has more than 0 credits
        // if (user.credits.value <= 0) {
        //     return res.status(401).json({ error: "Not enough credits" });
        // }

        let initialPrompt = `\n\nCan you optimize the code? 
        Also provide meaningful comments where necessary and put those comments inside the code. Each line should have a maximum of 15 words comment.
        Just give me the code only and nothing else. \n`;

        const resp = await gpt(initialPrompt + req.body.prompt);

        // //deduct 1 credit from user
        // user.credits.value -= 1;
        // //increase total optimizations
        // user.total_optimizations += 1;
        // await user.save();

        return res.status(200).json({ text: resp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.post("/debug", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = User.find({ magic_id: magicId });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check if user has more than 0 credits
        if (user.credits.value <= 0) {
            return res.status(401).json({ error: "Not enough credits" });
        }

        let initialPrompt = `Can you debug the code? 
        Highlight the errors and provide meaningful comments where necessary and put those comments inside the code. 
        Just give me the code only and nothing else. \n\n`;

        const resp = await gpt(initialPrompt + req.body.prompt);

        //deduct 1 credit from user
        user.credits.value -= 1;
        //increase total optimizations
        user.total_debugs += 1;
        await user.save();

        return res.status(200).json({text: resp});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
})

router.post("/generate", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = User.find({ magic_id: magicId });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check if user has more than 0 credits
        if (user.credits.value <= 0) {
            return res.status(401).json({ error: "Not enough credits" });
        }

        let initialPrompt = `Can you generate the code based on the prompt? Just give me the code only and nothing else. \n\n`;

        const resp = await gpt(initialPrompt + req.body.prompt);

        //deduct 1 credit from user
        user.credits.value -= 1;
        //increase total optimizations
        user.total_code_generations += 1;
        await user.save();

        return res.status(200).json({text: resp});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
})

router.post("/summarize", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = User.find({ magic_id: magicId });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check if user has more than 0 credits
        if (user.credits.value <= 0) {
            return res.status(401).json({ error: "Not enough credits" });
        }

        let initialPrompt = `Can you summarize the code? Start by saying, Heres a summarization of your code. \n\n`;

        const resp = await gpt(initialPrompt + req.body.prompt);

        //deduct 1 credit from user
        user.credits.value -= 1;
        //increase total optimizations
        user.total_code_generations += 1;
        await user.save();

        return res.status(200).json({text: resp});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
})

module.exports = router;