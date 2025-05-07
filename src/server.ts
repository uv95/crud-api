import http from 'node:http';

const PORT = 3000;

const server = http.createServer((req, res) => {});

server.listen(PORT, () => {
  console.log(`\x1b[36mServer listening on port: ${PORT}\x1b[0m`);
});
