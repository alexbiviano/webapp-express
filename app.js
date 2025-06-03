const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.SERVER_PORT || 3000;


app.use(cors({ origin: process.env.FE_APP }));
const moviesRouter = require('./routers/movies');
const { notFound, errorHandler } = require('./middleware/middlewareerror');
const imagePathMiddleware = require("./middleware/imagePath");
app.use(express.json());
app.use("/movies", moviesRouter);
app.use(imagePathMiddleware);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("benvenuti nel mio catalogo")
});
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server del catalogo in ascolto alla porta ${port}`);
});
