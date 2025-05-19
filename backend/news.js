const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY_1;
const country = 'us';
async function News(category) {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
        const articles = response.data.articles;

        const newsInfo = articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt
        }));

        return newsInfo;
    } catch (error) {
        console.error('', error);
        return [];
    }
}
module.exports = News;