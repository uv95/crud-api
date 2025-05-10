import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { PRIMARY_PORT } from './utils/consts';
import { styleText } from 'node:util';
import { runBalancer } from './load-balancer';
import { User } from './models/user.model';

const numWorkers = cpus().length - 1;

if (cluster.isPrimary) {
  runBalancer(numWorkers);

  console.log(styleText(['green'], `Master ${process.pid} is running`));

  for (let i = 0; i < numWorkers; i++) {
    const workerEnv = { PORT: (+PRIMARY_PORT + 1 + i).toString() };
    const worker = cluster.fork(workerEnv);

    worker.on('message', (message) => {
      sendToAllWorkers(message);
    });
  }

  cluster.on('exit', (worker) => {
    console.log(styleText(['magenta'], `Worker ${worker.process.pid} died.`));
    cluster.fork();
  });
} else {
  import('./server');
}

function sendToAllWorkers(message: { users: User[] }) {
  if (cluster.workers) {
    for (const worker of Object.values(cluster.workers)) {
      worker?.isConnected() && worker.send(message);
    }
  }
}
