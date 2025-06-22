const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Kategori diperlukan." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Bisa diganti ke gpt-4
      messages: [
        {
          role: "system",
          content: "Kamu adalah asisten kreatif yang membantu membuat ide konten media sosial."
        },
        {
          role: "user",
          content: `Buatkan 3 ide konten berdasarkan kategori "${category}" untuk masing-masing platform berikut: YouTube, TikTok, dan Instagram.`
        }
      ],
      temperature: 0.8,
      max_tokens: 600
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghasilkan ide." });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
