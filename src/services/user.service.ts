import { User } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

function getAll() {
  return users;
}

function getById(id: string) {
  return users.find((user) => user.id === id);
}

function createOne(data: User) {
  const newUser = {
    id: uuidv4(),
    ...data,
  };
  users.push(newUser);

  return newUser;
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

export default { getAll, getById, createOne, updateOne, deleteOne };
