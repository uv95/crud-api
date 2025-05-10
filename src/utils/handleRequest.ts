import { ServerResponse } from 'node:http';
import { styleText } from 'node:util';
import { Response } from './types';

export const handleRequest = <T>(res: ServerResponse, result: Response<T>) => {
  try {
    console.log(result);
    res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(styleText(['red'], 'Oops! Something went wrong!'));
  }
};
