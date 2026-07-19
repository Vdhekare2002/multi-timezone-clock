import express from "express";
import path from "path";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

// -------------------------
// Static Files
// -------------------------

app.use(express.static(path.join(process.cwd(), "client")));

app.use(
  "/dist",
  express.static(path.join(process.cwd(), "dist"))
);

// -------------------------
// Home Route
// -------------------------

app.get("/", (_, res) => {
  res.sendFile(
    path.join(process.cwd(), "client", "index.html")
  );
});

// -------------------------
// 404 Handler
// -------------------------

app.use((req, res) => {
  res.status(404).send(`
    <h2>404 - Page Not Found</h2>
    <p>The requested URL <b>${req.originalUrl}</b> was not found.</p>
  `);
});

// -------------------------
// Start Server
// -------------------------

app.listen(PORT, () => {
  console.log("");
  console.log("===================================");
  console.log("🌍 Multi-Timezone Clock");
  console.log(`🚀 Server : http://localhost:${PORT}`);
  console.log("===================================");
});