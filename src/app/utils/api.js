const API_KEY = '871e6bac99msh2e29d6468f0b337p178329jsnf65038904b46';
const API_HOST = 'article-extractor-and-summarizer.p.rapidapi.com';

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': API_HOST,
};

// Summarize GET API
export const getSummarizedArticle = async (url) => {
  try {
    const response = await fetch(
      `https://${API_HOST}/summarize?url=${encodeURIComponent(url)}&lang=en&engine=2`,
      { method: 'GET', headers }
    );
    const result = await response.json();
    return result.summary || 'Failed to fetch summary.';
  } catch (error) {
    console.error(error);
    return 'Error fetching summarized article.';
  }
};

// Extract GET API
export const extractArticle = async (url) => {
  try {
    const response = await fetch(
      `https://${API_HOST}/extract?url=${encodeURIComponent(url)}`,
      { method: 'GET', headers }
    );
    const result = await response.json();
    return result.article || 'Failed to fetch article.';
  } catch (error) {
    console.error(error);
    return 'Error extracting article.';
  }
};

// Summarize-text POST API
export const summarizeText = async (text) => {
  try {
    const response = await fetch(`https://${API_HOST}/summarize-text`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, engine: 2, lang: 'en' }),
    });
    const result = await response.json();
    return result.summary || 'Failed to summarize text.';
  } catch (error) {
    console.error(error);
    return 'Error summarizing text.';
  }
};
