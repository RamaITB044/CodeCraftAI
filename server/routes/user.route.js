const express = require('express');
const router = express.Router();
require("dotenv").config();
const User = require('../models/user.model');
const authMiddleware = require('../middlewares/authMiddleware');

//Route for sending user data
router.get("/data", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        return res.status(200).json({
            userData
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})

router.post('/createFile', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const { code_id, code, language, file_name, last_edited, created_at } = req.body;
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newCode = {
            code_id,
            code,
            language,
            file_name,
            last_edited,
            created_at
        };
        user.codes.push(newCode);
        await user.save();
        return res.status(200).json({ message: 'File created successfully!' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteFile/:code_id', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const { code_id } = req.params;
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const codeToDelete = user.codes.find(code => code.code_id === code_id);
        if (!codeToDelete) {
            return res.status(404).json({ error: 'Code not found' });
        }
        user.codes = user.codes.filter(code => code.code_id !== code_id);
        await user.save();
        return res.status(200).json({ message: 'Code deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/patchCode', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const { code_id, code, language, file_name, last_edited } = req.body;
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const codeToUpdate = user.codes.find(code => code.code_id === code_id);
        if (!codeToUpdate) {
            return res.status(404).json({ error: 'Code not found' });
        }
        codeToUpdate.code = code;
        codeToUpdate.language = language;
        codeToUpdate.file_name = file_name;
        codeToUpdate.last_edited = last_edited;
        await user.save();
        return res.status(200).json({ message: 'Code updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/checkSubscription', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.plan.plan_name === "Basic") {
            return res.status(200).json({ status: false });
        } else {
            return res.status(200).json({ status: true });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/subscribe', authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const { payment_signature } = req.body;
        const user = await User.findOne({ magic_id: magicId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.credits.value = 1000;
        user.plan.plan_name = "Pro";
        user.plan.price = 10.00;
        user.plan.payment_signature = payment_signature;
        user.plan.start_date = new Date().toISOString();
        user.plan.end_date = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString();
        await user.save();
        return res.status(200).json({ plan: user.plan, message: 'Subscription successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Subscription Failed! Please try again later.', error: error.message });
    }
})

module.exports = router;