// import mongoose from "mongoose";
// import app from "./app";
// import { configs } from "./app/configs";
// async function main() {
//     await mongoose.connect(configs.db_url!);
//     app.listen(configs.port, () => {
//         console.log(`Server listening on port ${configs.port}`);
//     });
// }
// main().catch(err => console.log(err));

import http from "http";
import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";
import { initSocket } from "./app/utils/socket";

async function main() {
  await mongoose.connect(configs.db_url!);

  const server = http.createServer(app);

  // 🔥 initialize socket.io here
  initSocket(server);

  server.listen(configs.port, () => {
    console.log(`🚀 Server running on port ${configs.port}`);
  });
}

main().catch((err) => console.log(err));
