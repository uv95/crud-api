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

  if (method === Methods.GET) {
    const id = url?.replace(`${BASE_URL}/`, '');

    if (id) {
      return handleRequest(res, user.getById(id));
    }

    handleRequest(res, user.getAll());
  }

  if (method === Methods.POST) {
  }
  if (method === Methods.PUT) {
  }
  if (method === Methods.DELETE) {
  }
}
