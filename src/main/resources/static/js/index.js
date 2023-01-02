const express = require('express');

const app = express();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

app.get('/rest/v1/api/templates/3dd0bf1b-7a06-4f76-904e-3a01bc50535e', async (_req, res) => {
    const url = 'https://localhost:8090/rest/v1/templates/3dd0bf1b-7a06-4f76-904e-3a01bc50535e';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'An error occurred'});
    }
});

const port = 3456;

app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
);
