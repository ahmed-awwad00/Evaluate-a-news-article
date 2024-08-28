import { checkURL } from './checkURL';
async function handleSubmit(event) {
  event.preventDefault();
  let url = document.getElementById('url').value;
  if (!checkURL(url)) {
    alert("Please enter a valid URL.");
    return;
  }
  const response = await fetch('http://localhost:8081/api', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url
    })
  });
  try {
    const data = await response.json();
    document.getElementById('polarity').innerHTML = `Polarity: ${data.polarity}`;
    document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById('text').innerHTML = `Text: ${data.text}`;
  } catch (error) {
    console.log("error", error);
  }
}
export { handleSubmit };