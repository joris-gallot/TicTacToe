import express from "express";
import fs from "fs";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { TicTacToe } from "./src/class/TicTacToe";

const users: { name: string; id: string }[] = [];

const game = new TicTacToe("foo", "bar");

async function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  // listen to socket connection
  io.on("connection", (socket) => {
    socket.on("name?", (name) => {
      users.push({ name, id: socket.id });
      io.emit("update:users", users);
    });

    socket.on("disconnect", () => {
      const index = users.findIndex((u) => u.id === socket.id);

      if (index !== -1) {
        users.splice(index, 1);
        io.emit("update:users", users);
      }
    });
  });

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    // const url = req.originalUrl;
    const __filename = fileURLToPath(import.meta.url);

    try {
      const __dirname = path.dirname(__filename);
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      // template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      // const { render } = await vite.ssrLoadModule("/src/entry-server.js");

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      // const appHtml = await render(url);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, template);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  server.listen(3000);
}

createServer();
