const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Distable/ enable button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: 'd7c99fb42ade48ccbaea56db6d514aeb',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
const getJokes = async () => {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        // Text-to-Speech
        tellMe(joke);

        // Distable Button
        toggleButton();

    } catch (error) {
        console.log('Whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)