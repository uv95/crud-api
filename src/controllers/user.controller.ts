//Обрабатывает входящие HTTP-запросы, вызывает соответствующие методы из services/ и формирует HTTP-ответы.

import { IncomingMessage, ServerResponse } from 'node:http';
import { BASE_URL } from '../utils/consts';

interface IHandleUsers {
  req: IncomingMessage;
  res: ServerResponse;
}

export function handleUsers({ req, res }: IHandleUsers) {
  const { method, url } = req;

  if (method === Methods.GET) {
    const id = url?.replace(`${BASE_URL}/`, '');

    if (id) {
    }
  }
}

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
