const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ae7d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const formDataCollection = client.db("oscar").collection("formData");
  console.log("database connected successfully");


  app.post("/formData", async (req, res) => {
    const newData = req.body;
    // console.log(newData)
    try {
      const result = await formDataCollection.insertOne(newData);
      res.send(result);
      console.log(result.insertedId);
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to oscar backed!");
});

app.listen(port);