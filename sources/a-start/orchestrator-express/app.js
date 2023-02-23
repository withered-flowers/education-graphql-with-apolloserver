const Redis = require("ioredis");
const axios = require("axios");
const cors = require("cors");
const express = require("express");

// Since this will be on production we need a more concise logger (e.g. morgan)
const morgan = require("morgan");

// :3000 = first-server
// :3001 = second-server
// :10000 = orchestrator-express

const FIRST_SERVER_URL =
  process.env.FIRST_SERVER_URL || "http://localhost:3000";
const SECOND_SERVER_URL =
  process.env.SECOND_SERVER_URL || "http://localhost:3001";

// Since this will be on production we need to optimize our query by using cache (redis-cache)
// new Redis (port, ip_address)
const redis = new Redis(6379, "127.0.0.1");

const app = express();
const port = process.env.PORT || 10000;

app
  // Middleware Cross Origin
  .use(cors())
  // Middleware Logger (Morgan)
  .use(morgan("tiny"))
  .get("/todos", async (_req, res, next) => {
    try {
      // We will try to use cache before query
      let todosCache = await redis.get("todo:get");

      if (todosCache) {
        // If cache is found, DO NOT QUERY, but RETURN THE CACHE RESULT

        // REMEMBER: In redis, our data is a STRING, so in order to "Objectify" it
        // We need to use "translate" the string to JSON via JSON.parse
        let todosResult = JSON.parse(todosCache);
        return res.status(200).json(todosResult);
      }

      // Redis cannot save the result as an object
      // So we need to stringify it
      const { data: response } = await axios.get(`${FIRST_SERVER_URL}/todos`);

      // If it's not cached yet, we will cache it !
      redis.set("todo:get", JSON.stringify(response));

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  })
  .delete("/todos/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const { data: response } = await axios.delete(
        `${FIRST_SERVER_URL}/todos/${id}`
      );

      // Because we're using cache, we need to invalidate the cache
      // (For the user's data accuracy)
      const keys = await redis.keys("todo:*");
      await redis.del(keys);

      res.status(200).json(response);
    } catch (err) {
      console.log(err);

      next(err);
    }
  })
  .get("/colors", async (_req, res, next) => {
    try {
      let colorCache = await redis.get("color:get");

      if (colorCache) {
        let colorResult = JSON.parse(colorResult);
        return res.status(200).json(colorResult);
      }

      const { dat: response } = await axios.get(`${SECOND_SERVER_URL}/colors}`);

      redis.set("color:get", JSON.stringify(response));

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  })
  .delete("/colors/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const { data: response } = await axios.delete(
        `${SECOND_SERVER_URL}/colors/${id}`
      );

      // Invalidate cache
      const keys = await redis.keys("color:*");
      await redis.del(keys);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  })
  .use((err, _req, res, _next) => {
    console.log(err);

    res.status(500).json({
      statusCode: 500,
      error:
        "Something wicked happened, but error handler not implemented yet !",
    });
  });

app.listen(port, (_) => console.log(`Orchestrator is working at port ${port}`));
