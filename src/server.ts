import http from 'node:http';
import { handleUsers } from './controllers/user.controller';
import { BASE_URL, PRIMARY_PORT } from './utils/consts';
import { styleText } from 'node:util';

const server = http.createServer((req, res) => {
  process.env.MODE === 'cluster' &&
    console.log(
      styleText(
        ['yellow'],
        `Worker ${process.pid} handling request on port ${process.env.PORT}`
      )
    );

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

process.on('unhandledRejection', (error: Error) => {
  console.log('UNHANDLED REJECTION ❗️', error.message);
  process.exit(1);
});
