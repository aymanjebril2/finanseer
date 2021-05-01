import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
app.get("/api/hello", (req, res) => {
  console.log("hello world!");
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.get("/api/signin", (req, res) => {
  if (req.params.email) {
    //change to proper conditionals
    if (req.params.password) {
      res.status(200).send({ success: true });
    } else {
      // need basic 400 failure
      res.status(401).send({ success: false, message: "incorrect password" });
    }
  } else {
    res.status(500).send({ success: false, message: "server error" });
  }
});

app.post("/api/register", (req, res) => {
  if (req.params.email) {
    // change to proper conditionals
    res.status(200);
    // check email as normal
  } else if ("???") {
    res.status(401).send({ success: false, message: "???" });
  } else {
    res.status(500).send({ success: false, message: "server error" });
=======

app.get('/api/hello', (req, res) => {
  console.log('hello world!')
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );

});

app.get('/api/signin', (req, res) => {
  if (req.params.email) { //change to proper conditionals
    if (req.params.password) {
      res.status(200).send({"success": true});
    } else {
      // need basic 400 failure
      res.status(401).send({ "success": false, "message": 'incorrect password' });
    }
  } else {
    res.status(500).send({ "success": false, "message": 'server error' });
  }
});

app.post('/api/register', (req, res) => {
  if (req.params.email) { // change to proper conditionals
      res.status(200);
      // check email as normal
  } else if ('???') {
    res.status(401).send({ "success": false, "message": '???' });
  } else {
    res.status(500).send({ "success": false, "message": 'server error' });
>>>>>>> 40651ea2698227cdbfcb1fc9c51290555ed5cb45
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
