const express = require('express');
const mongoose = require('mongoose');
const News = require('./news');
const app = express();
const cors = require('cors');
const {mongoUrl}= require('./key');
require('./User');
const User= mongoose.model('User');
const PORT = process.env.PORT;
const authRoutes = require('./userOperations');
app.use(cors());
app.use(express.json());
app.use(authRoutes);


mongoose.connect(mongoUrl)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const newsByCategory = {
    sport: [],
    business: [],
    technology: [],
    science: [],
    health: [],
    entertainment: [],
    general: []
};


async function fetchNews() {
    try {
        for (const category of Object.keys(newsByCategory)) {
            newsByCategory[category] = await News(category);
        }
    } catch (error) {
        console.error(error);
    }
}

setInterval(fetchNews, 10 * 60 * 1000);
fetchNews();

app.get('/news/:category', (req, res) => {
    let category = req.params.category;
    if (category === 'economy') {
        category = 'business';
    }
    if (newsByCategory[category]) {
        res.json(newsByCategory[category]);
    } else {
        res.status(404).json({ error: 'Category  not found' });
    }
});
app.get('/preferences/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user.preferences);
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})

