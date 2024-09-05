function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if(Client.checkForURL(formText)) {
    console.log("::: Form Submitted :::")

    postData('http://localhost:8080/api', { url: formText })

    .then(function(res) {
        document.getElementById('polarity').innerHTML = 'Polarity: '+polarityChecker(res.score_tag);
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    })
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}

const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            // Throw error for non-2xx responses
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newData = await response.json();
        console.log('Data received:', newData);
        return newData;
    } catch (error) {
        console.log('Error occurred:', error);
        alert('There was an issue with the request. Please try again.');
        return null; // Return null or handle the error further
    }
};


// API response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
const polarityChecker = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit }
export { polarityChecker }