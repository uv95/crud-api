import http from 'node:http';
import { handleUsers } from './controllers/user.controller';
import { BASE_URL } from './utils/consts';

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
  console.log(`\x1b[36mServer listening on port: ${PORT}\x1b[0m`);
});
