import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;
const DATA_FILE = "./birthdays.json";

app.use(cors());
app.use(express.json());

// helper: read JSON file
function readBirthdays() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

// GET all birthdays
app.get("/api/birthdays", (req, res) => {  
  const birthdays = readBirthdays();
  res.json(birthdays);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
