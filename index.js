import bodyParser from "koa-bodyparser";
import Koa from "koa";
import http from "http";
import https from "https";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import mongoose from "mongoose";
import jwt from "koa-jwt";

import { port, environment } from "./config/index.js";
import router from "./router/index.js";
import authRouter from "./router/auth.js"; // Assuming you have auth routes

import { getCurrentTime } from "./utils/index.js";
import dotenv from "dotenv";
dotenv.config();

/* Connect to DB
    Connection logic goes here
*/
mongoose
   .connect(
      "mongodb+srv://alis_user:user@cluster0.tn4mg5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   )
   .then(() => console.log("Database connected!"))
   .then(() => console.log(mongoose.connection.readyState))
   .catch((err) => console.log(err));

// Create Koa Application
const app = new Koa();

app.use(cors({ credentials: true }))
   .use(bodyParser())
   .use(helmet());

// JWT middleware
app.use(
   jwt({ secret: process.env.JWT_SECRET }).unless({
      path: [/^\/login/, /^\/register/],
   })
);

app.use(router.routes());
app.use(authRouter.routes());

const currentTime = getCurrentTime();

// Start the application
if (environment === "production") {
   const options = {
      cert: "", // sslCertificate
      key: "", // sslKey
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

// It should be at the end
app.use((ctx) => {
   ctx.status = 404;
   ctx.body = { message: "Endpoint not found" };
});

export default app;
