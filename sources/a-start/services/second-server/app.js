// This is a server with DB using PostgreSQL
// Assumption: This is a very complex apps which using express
// (many routes / db / relations)

const cors = require("cors");
const express = require("express");
const {
  getColor,
  putColor,
  deleteColor,
} = require("./controllers/colorController");

const app = express();
const port = process.env.PORT || 3001;

app
  // Since we will use an orchestrator, we need to use cross domain.
  // hence we need to use cors
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .get("/", (_req, res) => {
    res.status(200).json({
      statusCode: 200,
      message: "Echo success",
    });
  })
  .get("/colors", getColor)
  .put("/colors/:id", putColor)
  .delete("/colors/:id", deleteColor)
  .use((err, _req, res, _next) => {
    console.log(err);

    res.status(500).json({
      statusCode: 500,
      error:
        "Something wicked happened, but error handler not implemented yet !",
    });
  })
  .listen(port, (_) => console.log(`apps is working at ${port}`));
