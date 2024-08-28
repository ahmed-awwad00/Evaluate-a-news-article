async function handleSubmit(event) {
    event.preventDefault();

    let url = document.getElementById('url').value;

    if (!checkURL(url)) {
        alert("Please enter a valid URL.");
        return;
    }

    console.log("Sending URL to server:", url);

    try {
        const response = await fetch('http://localhost:8081/api', {  // Make sure this matches your server port
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        document.getElementById('polarity').innerHTML = `Polarity: ${data.polarity}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('text').innerHTML = `Text: ${data.text}`;
    } catch (error) {
        console.error("Error in handleSubmit:", error);
        alert("Failed to fetch data. Please try again.");
    }
}
