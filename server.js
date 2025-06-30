// server.js
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Insert your key here (DO NOT share this file)
const configuration = new Configuration({
  apiKey: 'sk-xxxxx', // <--- YOUR KEY HERE
});
const openai = new OpenAIApi(configuration);

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: 'You are Lil Scoom, a helpful AI assistant.' },
        { role: 'user', content: userMessage }
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI failed to reply 😔' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Lil Scoom API running on http://localhost:${PORT}`);
});
