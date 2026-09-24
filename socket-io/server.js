import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

/**
 * Server pe ek naya connection banega to ye callback chalega. iss callback ke ander jo bhi likha hoga wo execute hojayga
 */
io.on("connection", (socket) => {
  console.log("new connection created!");

  // any single user (don't know who) will fire an event (message event) that will be listen on
  socket.on("message", (msg) => {
    console.log("user fired message event");
    console.log(msg)
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
