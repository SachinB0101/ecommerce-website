import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("It works!");
});

app.listen(8080, () => console.log("Listening at port 8080"));
