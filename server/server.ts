import express from "express";
import path from "path";

const app = express();

const PORT = 3000;

// Client folder ko public bana do
app.use(express.static(path.join(__dirname, "../client")));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});