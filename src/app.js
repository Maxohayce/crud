const express = require("express");
const app = express();
const port = 5000;
const dbSetup = require("./database/setup");
const dataRoutes = require("./routes/dataRoutes");
const formData = require('express-form-data');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formData.parse());


dbSetup();

app.use(dataRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
