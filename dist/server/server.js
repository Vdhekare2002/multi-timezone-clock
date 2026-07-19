"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
// -------------------------
// Static Files
// -------------------------
app.use(express_1.default.static(path_1.default.join(process.cwd(), "client")));
app.use("/dist", express_1.default.static(path_1.default.join(process.cwd(), "dist")));
// -------------------------
// Home Route
// -------------------------
app.get("/", (_, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "client", "index.html"));
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
