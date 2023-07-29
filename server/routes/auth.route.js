const express = require('express');
const router = express.Router();
const authValidation = require('../validations/auth.validation');

router.post('/login', authValidation.validateLogin, (req, res) => {
    res.json({ message: 'Login successful' });
});
router.post('/register', authValidation.validateRegister, (req, res) => {
    res.json({ message: 'Register successful' });
});

module.exports = router;