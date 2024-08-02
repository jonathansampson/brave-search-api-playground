import BraveAPI from './API';
import express from 'express';
import configs from './configs';

const app = express();
const port = process.env.PORT || configs.preferredServicePort;

app.use(express.json());

// During development, the front-end runs on port 5173
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post(configs.publicServePath, async (req, res) => {
  const { key, query, type, parameters = {} } = req.body as Record<string, string>;

  // Require that key, query, and type are provided
  if (!key || !query || !type) {
    return res.status(400).json({
      error: 'Missing required parameters',
    });
  }

  let status = 200;
  let response: Record<string, unknown>;

  const params = { q: query, ...parameters };
  const brave = new BraveAPI({ subscription_token: key });

  try {
    if (type === 'web') {
      response = await brave.web(params);
    }
    else if (type === 'image') {
      response = await brave.image(params);
    }
    else if (type === 'video') {
      response = await brave.video(params);
    }
    else if (type === 'news') {
      response = await brave.news(params);
    }
    else if (type === 'suggest') {
      response = await brave.suggest(params);
    }
    else if (type === 'spellcheck') {
      response = await brave.spellcheck(params);
    }
    else {
      throw new Error('Invalid type');
    }
  }
  catch (error: unknown) {
    status = 500;
    response = { error: (error as Error).message };
  }

  // Send the response
  res.status(status).json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
