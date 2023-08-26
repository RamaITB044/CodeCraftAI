const express = require("express");
const router = express.Router();
const { gpt, chatGpt } = require("../services/gpt.service");
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

router.post("/optimize", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check if user has more than 0 credits
        if (user.credits.value <= 0) {
            return res.status(401).json({ error: "Not enough credits" });
        }

        let initialPrompt = `\n\nCan you optimize the code? If the code is already optimized do not change anything do nothing. Just give me the code only and nothing else. Also provide time and space complexity at the end of the code inside comments.\n`;

        const resp = await gpt(initialPrompt + req.body.prompt);

        // //deduct 1 credit from user
        user.credits.value -= 1;
        //increase total optimizations
        user.total_code_optimizations += 1;
        await user.save();

        return res.status(200).json({ text: resp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.post("/debug", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = await User.findOne({ magic_id: magicId });
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
        user.total_code_debuggings += 1;
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
        const user = await User.findOne({ magic_id: magicId });
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
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check if user has more than 0 credits
        if (user.credits.value <= 0) {
            return res.status(401).json({ error: "Not enough credits" });
        }

        let initialPrompt = `Add comment line to each line of the code \n\n`;

        const resp = await gpt(initialPrompt + req.body.prompt); 

        //deduct 1 credit from user
        user.credits.value -= 1;
        //increase total optimizations
        user.total_code_summarizations += 1;
        await user.save();

        return res.status(200).json({text: resp});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
})

router.post('/chat', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const { code, messages } = req.body;
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resp = await chatGpt(code, messages);

        //deduct 2 credit from user
        user.credits.value -= 2;
        await user.save();

        return res.status(200).json({reply: resp});
    } catch (error) {
        
    }
})

module.exports = router;