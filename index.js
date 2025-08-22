const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// NewsAPI demo endpoint (no API key required, limited headlines)
const NEWS_API_URL = 'https://newsdata.io/api/1/news?apikey=pub_25737f8d1f7d7c1e2f983f9e53a2d9c1d1a36&q=latest&language=en';

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL);
    const articles = response.data.results || [];
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch news.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
