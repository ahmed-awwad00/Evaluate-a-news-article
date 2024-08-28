# Evaluate a News Article with Natural Language Processing

## Project Description
This project evaluates news articles using Natural Language Processing (NLP). It allows users to input a URL, which is then analyzed using an external NLP API to return the polarity, subjectivity, and a snippet of the article.

## How to Run the App
1. Install dependencies: `npm install`
2. Run the app in development mode: `npm run build-dev`
3. Run the app in production mode: `npm run build-prod`
4. Start the server: `npm run start`
5. Access the app at: `http://localhost:8080`

## Dependencies
- Express
- Webpack
- Sass
- Babel
- Workbox
- Jest

## API
- MeaningCloud API (for NLP analysis)

## Offline Functionality
Service workers are implemented for offline capabilities using Workbox.