const express = require("express");
require("dotenv").config();

const app = express();

const PORT = 3003;

app.use(express.json());

app.use(express.static("public"));


async function generateWithGemini(prompt) {

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            },

            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        }
    );

    if (!response.ok) {

        const errorData = await response.text();

        console.log("Gemini Error:", errorData);

        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    return data.candidates[0].content.parts[0].text;
}


app.get("/joke", async (req, res) => {

    try {

        const joke = await generateWithGemini(
            "Tell me one short, clean and funny joke."
        );

        res.json({
            joke: joke
        });

    } catch (error) {

        console.error("ERROR:", error);

        res.status(500).json({
            error: "Failed to generate joke"
        });
    }
});


app.get("/motivation", async (req, res) => {

    try {

        const motivation = await generateWithGemini(
            "Give me one short and inspiring motivational quote."
        );

        res.json({
            motivation: motivation
        });

    } catch (error) {

        console.error("ERROR:", error);

        res.status(500).json({
            error: "Failed to generate motivation"
        });
    }
});


app.get("/tip-of-the-day", async (req, res) => {

    try {

        const tip = await generateWithGemini(
            "Give me one short, practical and helpful tip for everyday life."
        );

        res.json({
            tip: tip
        });

    } catch (error) {

        console.error("ERROR:", error);

        res.status(500).json({
            error: "Failed to generate tip"
        });
    }
});


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});