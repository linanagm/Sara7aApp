import express from "express";

import bootstrap from "./src/app.controller.js";

const PORT = 3000;
const app = express();
const host = "localhost";

await bootstrap(app, express);


app.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
});

