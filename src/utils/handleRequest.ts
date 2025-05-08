import { ServerResponse } from 'node:http';
import { colorize } from './consts.js';
import { Colors, Response } from './types.js';

export const handleRequest = <T>(res: ServerResponse, result: Response<T>) => {
  try {
    res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(colorize('Oops! Something went wrong!', Colors.RED));
  }
};
