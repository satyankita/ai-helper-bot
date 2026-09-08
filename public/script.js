const jokeButton = document.getElementById("jokeButton");
const motivationButton = document.getElementById("motivationButton");
const tipButton = document.getElementById("tipButton");

const responseText = document.getElementById("response");


// Get Joke
jokeButton.addEventListener("click", async () => {

    responseText.textContent = "Generating a joke...";

    try {

        const response = await fetch("/joke");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        responseText.textContent = data.joke;

    } catch (error) {

        console.error(error);

        responseText.textContent =
            "Sorry, we couldn't generate a joke.";
    }
});


// Get Motivation
motivationButton.addEventListener("click", async () => {

    responseText.textContent = "Generating motivation...";

    try {

        const response = await fetch("/motivation");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        responseText.textContent = data.motivation;

    } catch (error) {

        console.error(error);

        responseText.textContent =
            "Sorry, we couldn't generate motivation.";
    }
});


// Get Tip
tipButton.addEventListener("click", async () => {

    responseText.textContent = "Generating today's tip...";

    try {

        const response = await fetch("/tip-of-the-day");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        responseText.textContent = data.tip;

    } catch (error) {

        console.error(error);

        responseText.textContent =
            "Sorry, we couldn't generate today's tip.";
    }
});