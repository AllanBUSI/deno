import {
  Application,
  Context,
  isHttpError,
} from "https://deno.land/x/oak/mod.ts";
import { config } from "./config/config.ts";
import route from "./routes/index.ts";

const app = new Application();

// port
const PORT = parseInt(config.PORT) | 3000;

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

// middleware
app.use(async (ctx: Context, next) => {
  try {
    await next();
  } catch (error) {
    if (isHttpError(error)) {
      switch (error.status) {
        case 404:
          ctx.response.status = 404;
          ctx.response.body = error;
          break;
        case 500:
          ctx.response.status = 500;
          ctx.response.body = error;
          break;
        default:
          ctx.response.status = 400;
          ctx.response.body = error;
          break;
      }
    }
  }
});

app.use(route.routes());
app.use(route.allowedMethods());

// cron
// import "./cron/subscribe.ts";
// lancement serveur
// deno run --allow-net --allow-read --unstable server.ts
await app.listen({ port: PORT });
