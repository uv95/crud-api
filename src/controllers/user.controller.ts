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

    handleRequest(res, id ? user.getById(id) : user.getAll());
  }
}
