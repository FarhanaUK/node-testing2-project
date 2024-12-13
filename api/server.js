const express = require("express");
const usersRouter = require("./users-router");  // Correctly import the router
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to the API server! It is running.");
});

// Mount usersRouter on /api/users endpoint
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;  // Export server for testing or running
