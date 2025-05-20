import http from 'node:http';
import { styleText } from 'node:util';
import { PRIMARY_PORT } from './utils/consts';

export function runBalancer(numWorkers: number) {
  const ports = Array.from(
    { length: numWorkers },
    (_, i) => +PRIMARY_PORT + i + 1
  );
  let currentIndex = 0;

  const balancer = http.createServer((req, res) => {
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
      res.end(
        styleText(['red'], `Balancer error on port ${port}: ${error.message}`)
      );
    });

    req.pipe(proxy);
  });

  balancer.listen(PRIMARY_PORT, () =>
    console.log(
      styleText(['cyan'], `Balancer running on port: ${PRIMARY_PORT}`)
    )
  );
}
