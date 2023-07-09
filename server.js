const supabaseUrl = "https://keerrggipsskzhzfzicg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXJyZ2dpcHNza3poemZ6aWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NDI2MDAsImV4cCI6MjAwMzQxODYwMH0.MRp3meFNt2rdgxDRXr4_W3-Vdm0qbxxm9dSeRNYr9yQ";
const express = require("express");
const body = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
// const { error } = require("jquery");
const app = express();
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static("public"));
app.use(body.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register.html", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const logindata = { email, password };
  console.log(logindata);
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const userdata = { firstname, lastname, email, password };
  const { data, error } = await supabase.from("user-form").insert([userdata]);
  console.log(data);
  if (error) {
    res.status(500).json({ error: "Failed to insert data" });
  } else {
    // res.status(200).json({ message: "Data inserted" });
    alert("Data inserted successfully");
  }
});

app.listen(300, () => {
  console.log("Server started");
});
