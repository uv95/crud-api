import { User } from '../models/user.model.';

let users: User[] = [];

function getAll() {
  return users;
}

function getById(id: string) {
  return users.find((user) => user.id === id);
}

function createOne(data: User) {
  users.push(data);
  return users;
}

function updateOne(id: string, data: User) {
  const updatedUser = {
    id,
    ...data,
  };
  users = users.map((user) => (user.id === id ? updatedUser : user));

  return updatedUser;
}

function deleteOne(id: string) {
  users = users.filter((user) => user.id !== id);
  return users;
}

export { getAll, getById, createOne, deleteOne };
