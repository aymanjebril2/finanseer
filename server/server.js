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

app.use("/api/finance", finance());
app.use("/api", authentication());

app.use("*", (request, response) => {
  response.status(404).json({ message: "api not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
