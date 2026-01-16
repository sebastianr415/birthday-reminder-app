import express from "express";
import cors from "cors";
import fs from "fs";
import { randomUUID } from "crypto";

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

// helper: write JSON file
function writeBirthdays(birthdays) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(birthdays, null, 2));
}

// GET all birthdays
app.get("/api/birthdays", (req, res) => {  
  const birthdays = readBirthdays();
  res.json(birthdays);
});

//POST a new birthday
app.post("/api/birthdays", (req, res) =>{
  const {name, birthday} = req.body;

  //validate the input 
  if(!name || !birthday) {
    return res.status(400).json({error:"name and birthday are required"})
  }

  //read existing birthdays
  const birthdays = readBirthdays();

  //creating a new birthday object with unique id 
  const newBirthday = {
    id: randomUUID(),
    name: name,
    birthday: birthday,
  }

  //add the new birthday to the array
  birthdays.push(newBirthday);
  //write the updated birthdays to the file
  writeBirthdays(birthdays);
  //send the new birthday as a response with 201 status code
  res.status(201).json(newBirthday);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
