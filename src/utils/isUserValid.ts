import { User } from '../models/user.model';

export const isUserValid = (user: any): user is User => {
  return (
    typeof user === 'object' &&
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby: string) => typeof hobby === 'string')
  );
};
