import { Colors } from './types.js';

export const BASE_URL = '/api/users';

export const colorize = (string: string, color: Colors) =>
  `${color}${string}${Colors.RESET}`;
