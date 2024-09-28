
const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3015;

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

// Path to the database and SQL file
const dbPath = path.join(__dirname, "players.db"); // This will be your actual DB file
const sqlFilePath = path.join(__dirname, "newPlayers.sql"); // Path to your SQL script

let db = null;

// Function to initialize the DB and server
const initializeDBAndServer = async () => {
  try {
    console.log("Connecting to the database...");
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Connected to the database.");

    // Check if the table exists, if not, execute the SQL file to create it
    const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='players';");

    if (!tableExists) {
      console.log("Table 'players' does not exist. Initializing database...");
      const sql = fs.readFileSync(sqlFilePath, "utf-8");
      console.log("Executing SQL:", sql); // Log the SQL content

      try {
        await db.exec(sql); // Run the SQL script to initialize the database
        console.log("Database initialized from players.sql file.");
      } catch (error) {
        console.error("Failed to execute SQL file:", error.message);
      }
    } else {
      console.log("Table 'players' already exists.");
    }

    // Start the server
    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}/`);
    });

  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// Initialize the database and server
initializeDBAndServer();

// Endpoint to fetch all players from the 'players' table
app.get("/players/", async (request, response) => {
  try {
    const getPlayersQuery = `
      SELECT
        *
      FROM
        players;
    `;
    const playersArray = await db.all(getPlayersQuery);
    response.send(playersArray); // Send the list of players as response
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});