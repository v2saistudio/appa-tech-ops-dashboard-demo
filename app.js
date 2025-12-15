const protect = require("static-auth");
const safeCompare = require("safe-compare");
const path = require("path");
const http = require("http");

const app = protect(
  "/",
  (username, password) =>
    safeCompare(username, process.env.BASIC_AUTH_USER || "demo") &&
    safeCompare(password, process.env.BASIC_AUTH_PASS || "demo123"),
  {
    // ここ重要：あなたの環境では build が正解
    directory: path.join(__dirname, "build"),
    onAuthFailed: (res) => {
      res.statusCode = 401;
      res.end("Authentication failed");
    },
  }
);

// ここ重要：待ち受け（起動）する
const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT, () => {
  console.log(`Basic auth server running on http://localhost:${PORT}`);
});
