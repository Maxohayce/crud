const express = require("express");
const app = express();
const port = 5000;
const dbSetup = require("./database/setup");
const dataRoutes = require("./routes/dataRoutes");

app.use(express.json());

dbSetup();

app.use(dataRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
