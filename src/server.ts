import http from 'node:http';
import { handleUsers } from './controllers/user.controller.js';
import { BASE_URL, colorize } from './utils/consts.js';
import { Colors } from './utils/types.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url?.startsWith(BASE_URL)) {
    handleUsers({ req, res });
    return;
  }

  res.statusCode = 404;
  res.end('not found');
});

server.listen(PORT, () => {
  console.log(colorize(`Server listening on port: ${PORT}`, Colors.CYAN));
});
