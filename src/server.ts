import http from 'node:http';
import dotenv from 'dotenv';
import { handleUsers } from './controllers/user.controller.js';
import { BASE_URL, PRIMARY_PORT } from './utils/consts.js';
import { styleText } from 'node:util';

dotenv.config();

const server = http.createServer((req, res) => {
  console.log(
    styleText(
      ['yellow'],
      `Worker ${process.pid} handling request on port ${process.env.PORT}`
    )
  ); // for round-robin algoritm check

  if (req.url?.startsWith(BASE_URL)) {
    handleUsers({ req, res });

    return;
  }

  res.statusCode = 404;
  res.end('Page not found!');
});

server.listen(PRIMARY_PORT, () => {
  console.log(styleText(['cyan'], `Server listening on port: ${PRIMARY_PORT}`));
});
