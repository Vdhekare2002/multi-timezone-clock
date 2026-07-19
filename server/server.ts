import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve client files
app.use(express.static(path.join(process.cwd(), "client")));

// Serve compiled JS
app.use("/dist", express.static(path.join(process.cwd(), "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});