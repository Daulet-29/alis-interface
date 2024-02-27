import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import http from 'http';
import https from 'https';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import mongoose from 'mongoose';

import {
  port,
  environment,
} from './config/index.js';
import router from './router/index.js';
import { getCurrentTime } from './utils/index.js';

/* Connect to DB
    Connection logic goes here
*/
mongoose
  .connect(
    'mongodb+srv://user:user@smavyplatform.eyoabnp.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

// Create Koa Application
const app = new Koa();

app
  .use(cors({ credentials: true }))
  .use(bodyParser())
  .use(helmet());

app.use(router.routes());


const currentTime = getCurrentTime();
// Start the application
if (environment === 'production') {
  const options = {
    cert: '', // sslCertificate
    key: '', // sslKey 
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

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log('Backend server is running at: ', port);
  });
});

// It should be at the end
app.use((req, res) => {
  return res.status(404).json({ message: 'Endpoint not found' });
});

export default app;