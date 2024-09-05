const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))
app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'src')));


console.log(__dirname)

// API
const baseURL = 'https://api.meaningcloud.com/summarization-1.0'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [] // const does not work

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.sendFile(path.join(__dirname, 'src/client/js/formHandler.js'));//http://localhost:8080/api

    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// POST Route
app.post('/api', async function(req, res) {
    const userInput = req.body.url;
    console.log(`Received URL: ${userInput}`);
    
    // Construct the API URL
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

    try {
        const response = await fetch(apiURL);
        const mcData = await response.json();

        // Check if response from API is valid
        if (!mcData || mcData.status.code !== '0') {
            throw new Error('Error in MeaningCloud API response');
        }

        // Extract and send only the necessary data to the client
        const projectData = {
            score_tag: mcData.score_tag,
            agreement: mcData.agreement,
            subjectivity: mcData.subjectivity,
            confidence: mcData.confidence,
            irony: mcData.irony
        };
        console.log(projectData);

        // Send the extracted data to the client
        res.json(projectData);
    } catch (error) {
        console.error('Error fetching data from MeaningCloud API:', error);
        res.status(500).send('Internal Server Error');
    }
});



// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log(' app listening on port 8080!')
})
