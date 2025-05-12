export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Response<T> {
  data: T | null;
  statusCode: number;
  message?: string;
}
