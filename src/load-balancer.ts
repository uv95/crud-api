import http from 'node:http';
import { styleText } from 'node:util';

const ports = [4001, 4002, 4003];
let currentIndex = 0;

export const loadBalancer = http.createServer((req, res) => {
  const port = ports[currentIndex];
  currentIndex = (currentIndex + 1) % ports.length;

  const options = {
    hostname: 'localhost',
    port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxy.on('error', (error) => {
    res.writeHead(500);
    res.end(styleText(['red'], `Balancer error: ${error.message}`));
  });

  req.pipe(proxy);
});
