import { IncomingMessage, ServerResponse } from 'node:http';
import { BASE_URL } from '../utils/consts.js';
import user from '../services/user.service.js';
import { Methods } from '../utils/types.js';
import { handleRequest } from '../utils/handleRequest.js';

interface IHandleUsers {
  req: IncomingMessage;
  res: ServerResponse;
}

export function handleUsers({ req, res }: IHandleUsers) {
  const { method, url } = req;
  const id = url?.replace(`${BASE_URL}`, '').replace('/', '') || '';

  if (method === Methods.GET) {
    if (id) {
      return handleRequest(res, user.getById(id));
    }

    handleRequest(res, user.getAll());
  }

  if (method === Methods.POST) {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => handleRequest(res, user.createOne(JSON.parse(body))));
  }

  if (method === Methods.PUT) {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () =>
      handleRequest(res, user.updateOne(id, JSON.parse(body)))
    );
  }

  if (method === Methods.DELETE) {
    handleRequest(res, user.deleteOne(id));
  }
}
