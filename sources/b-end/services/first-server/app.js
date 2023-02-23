// This is a server with DB using PostgreSQL
// Assumption: This is a very complex apps which using express
// (many routes / db / relations)

const cors = require("cors");
const express = require("express");
const {
  todoGetAll,
  todoPost,
  todoDelete,
} = require("./controllers/todoController");

const app = express();
const port = process.env.PORT || 3000;

// Since we will use an orchestrator, we need to use cross domain.
// hence we need to use cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app
  .get("/", (_req, res) => {
    res.status(200).json({
      statusCode: 200,
      message: "Echo success",
    });
  })
  .post("/todos", todoPost)
  .get("/todos", todoGetAll)
  .delete("/todos/:id", todoDelete)
  .use((err, _req, res, _next) => {
    console.log(err);

    res.status(500).json({
      statusCode: 500,
      error:
        "Something wicked happened, but error handler not implemented yet !",
    });
  })
  .listen(port, (_) => console.log(`apps is working: ${port}`));
