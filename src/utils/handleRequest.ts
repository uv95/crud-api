import { ServerResponse } from 'node:http';
import { colorize } from './consts.js';
import { Colors } from './types.js';

export const handleRequest = <T>(res: ServerResponse, result: T) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(colorize('Oops! Something went wrong!', Colors.RED));
  }
};
