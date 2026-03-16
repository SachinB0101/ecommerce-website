import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payments";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
