import "dotenv/config";
import http from "node:http";
import connectDB from "./src/common/config/db.js";
import app from "./src/app.js";

async function main() {
  await connectDB();
  const PORT = process.env.PORT || 8000;
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`server is listening ${PORT}`);
  });
}

main();
