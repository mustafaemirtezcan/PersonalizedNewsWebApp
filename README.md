# Personalized News Web App
This is a customizable news feed web application. Users can personalize their news portal based on their interests. Additionally, news articles are categorized into prominent sections such as Technology and Health, and the latest news is made publicly accessible.

The application integrates the News API as its news source. The frontend is developed using React, while the backend is built with Node.js. MongoDB is used as the user database. User registration, authentication, and API integrations are implemented securely.

This web application features a clean and modern interface and offers a user-friendly experience with a focus on user interaction.
## Project User Guide 
### Getting Started
To run the web application locally, you will need:
- A **MongoDB** account with a valid **database connection URL** [MongoDB](https://www.mongodb.com/)
- An **API key** from [News API](https://newsapi.org/)

These credentials should be added to the `.env` file located inside the `backend/` directory. Make sure to define the necessary variables such as:

```env
API_KEY_1=your_newsapi_key
API_URL_1=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
PORT=your_preferred_port_number  # e.g., 3000
```
### Running the Application
# 1. Start the Backend (Node.js):
