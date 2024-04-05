import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import mongoose from "mongoose";
import http from "http";
import https from "https";

import usersRouter from "./router/users.js";
import organizationRouter from "./router/organization.js";
import documentTemplateRouter from "./router/documentTemplates.js";
import documentRouter from "./router/documents.js";
import documentEdoRouter from "./router/documentEdo.js";
import clientsRouter from "./router/clients.js";

import { port, environment } from "./config/index.js";
import baseRouter from "./router/index.js";
import { getCurrentTime } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://user:nurik_2006@cluster0.tn4mg5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const app = new Koa();
app.use(cors()).use(bodyParser()).use(helmet());

const currentTime = getCurrentTime();
if (environment === "production") {
  const options = {
    cert: "",
    key: "",
  };
  https.createServer(options, app.callback()).listen(port, () => {
    console.log(
      `✅  ${currentTime} - The server is running at https://localhost:${port}/`
    );
  });
} else {
  http.createServer(app.callback()).listen(port, () => {
    console.log(
      `✅  ${currentTime} - The server is running at http://localhost:${port}/`
    );
  });
}

app.use(baseRouter.routes()).use(baseRouter.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
app.use(organizationRouter.routes()).use(organizationRouter.allowedMethods());
app
  .use(documentTemplateRouter.routes())
  .use(documentTemplateRouter.allowedMethods());
app.use(documentRouter.routes()).use(documentRouter.allowedMethods());
app.use(documentEdoRouter.routes()).use(documentEdoRouter.allowedMethods());
app.use(clientsRouter.routes()).use(clientsRouter.allowedMethods());

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint not found" });
});

export default app;
