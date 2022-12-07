import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import openapiRouter from "./routes/openapi_route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5174", "https://nodeopenai.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/openai", openapiRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
