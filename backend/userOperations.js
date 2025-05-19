const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtKey} = require('./key');
const router = express.Router();
const User= mongoose.model('User');


router.post('/login', async (req, res) => {
    const {userId, password} = req.body;
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const isPasswordTrue = await user.comparePassword(password);
        if (!isPasswordTrue) {
            return res.status(401).send('Invalid password.');
        }
        const token = jwt.sign({userId: user.userId}, jwtKey, {expiresIn: '1h'});
        res.send({message: 'Login successful.', token});
    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send({error: 'Error about login.'});
    }
})

router.post('/register', async (req, res) => {
    const { userId, password } = req.body;
    try{
        if(userId.length>15){
            return res.status(422).send('Username cannot be more than 15 characters.');
        }
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(409).send( 'Username already exists.' );
        }
        const user = new User({ userId, password });
        await user.save();
        res.send('User registered successfully.');
    }
    catch (err) {
        console.error('Error:', err.message);
        return res.status(422).send( 'Error about registration.' );
    }
})
router.post('/preferences', async (req, res) => {
    const { userId, categories } = req.body;

    if (!userId || !categories) {
        return res.status(400).json({ error: 'Eksik bilgi gönderildi.' });
    }

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        user.preferences = categories;
        await user.save();
        res.status(200).json({ message: 'Preferences başarıyla güncellendi.' });
    } catch (error) {
        console.error('Preferences güncellenirken hata oluştu:', error);
        res.status(500).json({ error: 'Sunucu hatası.' });
    }
});

module.exports = router;