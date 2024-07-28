import BraveAPI from './API.js';
import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const basePath = "/brave-search-api";

// Allow requests from localhost:5173
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(basePath, express.static("../dist"));

app.get(basePath + "/", (req, res) => {
    const index = path.resolve(__dirname, '../', 'dist/index.html');
    res.sendFile( index );
});

app.post(basePath + '/search', async (req, res) => {

    const { key, query, type, parameters = {} } = req.body;
    const brave = new BraveAPI({ subscription_token: key });

    console.log(key, query, type, parameters);

    try {

        let endpoint;
        let _type = type.toLowerCase();

        switch ( _type ) {
            case "web":         endpoint = brave.web;           break;
            case "image":       endpoint = brave.image;         break;
            case "video":       endpoint = brave.video;         break;
            case "news":        endpoint = brave.news;          break;
            case "suggest":     endpoint = brave.suggest;       break;
            case "spellcheck":  endpoint = brave.spellcheck;    break;
        }

        res.json(await endpoint.call(
            brave, { q: query, ...parameters })
        );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
