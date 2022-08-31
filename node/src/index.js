const express = require('express');

const app = express();

/*app.get('/', (req, res, next) => {
    const message = "Greetings";
    console.log(message);
    res.status(200).send(message);
});*/
app.use('/health', require('express-healthcheck')());

app.listen(process.env.PORT, async() => {
    console.log(`Server is running at ${process.env.PORT}`);
});