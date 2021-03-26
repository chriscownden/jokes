const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button (disabled when audio is on then enable when joke is finished)
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  // The API key below is from a free source so use it if you want to. 
  VoiceRSS.speech({
    key: 'd40fae04ccd9425fb25eaf101f5f96a4',
    src: jokeString,
    hl: 'en-gb',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);


// APIs for seting up Fetch Request
// RapidAPI.com
// https://drive.google.com/file/d/12AYMIVokAFYhNnf3wyQPlsfpJrq4t9yN/view
// https://sv443.net/jokeapi/v2/
// https://rapidapi.com/user/voicerss
// http://voicerss.org/

