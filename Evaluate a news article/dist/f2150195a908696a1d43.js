import { checkURL } from './checkURL';
async function handleSubmit(event) {
  event.preventDefault();
  let url = document.getElementById('url').value;

  // If using URL for text, ensure that URL check is adapted or switched to text input
  if (!checkURL(url)) {
    alert("Please enter a valid URL.");
    return;
  }

  // Change endpoint to match server port
  const response = await fetch('http://localhost:3000/api', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: url
    }) // Assuming the backend expects 'text'
  });
  try {
    const data = await response.json();
    if (response.ok) {
      // Display the summary or result from the API
      document.getElementById('summary').innerHTML = `Summary: ${data.summary}`;
    } else {
      alert(data.error || 'An error occurred.');
    }
  } catch (error) {
    console.log("error", error);
    alert('Failed to fetch data. Please try again.');
  }
}
export { handleSubmit };