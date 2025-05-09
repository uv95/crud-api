import { User } from '../models/user.model.js';
import { v4 as uuidv4, validate } from 'uuid';
import { isUserValid } from '../utils/isUserValid.js';

let users: User[] = [];

function getAll() {
  return {
    data: users,
    statusCode: 200,
  };
}

function getById(id: string) {
  if (!validate(id)) {
    return {
      data: null,
      statusCode: 400,
      message: 'ID is invalid!',
    };
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
    };
  }

  return {
    data: user,
    statusCode: 200,
  };
}

function createOne(data: User) {
  if (!isUserValid(data)) {
    return {
      data: null,
      statusCode: 400,
      message: 'Required fields not provided, or data type is wrong!',
    };
  }

  const newUser = {
    id: uuidv4(),
    ...data,
  };

  users.push(newUser);

  return {
    data: newUser,
    statusCode: 201,
  };
}

function updateOne(id: string, data: User) {
  if (!validate(id)) {
    return {
      data: null,
      statusCode: 400,
      message: 'ID is invalid!',
    };
  }

  const userExists = users.find((user) => user.id === id);

  if (!userExists) {
    return {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
    };
  }

  const updatedUser = {
    id,
    ...data,
  };

  users = users.map((user) => (user.id === id ? updatedUser : user));

  return {
    data: updatedUser,
    statusCode: 200,
  };
}

function deleteOne(id: string) {
  if (!validate(id)) {
    return {
      data: null,
      statusCode: 400,
      message: 'ID is invalid!',
    };
  }

  const userExists = users.find((user) => user.id === id);

  if (!userExists) {
    return {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
    };
  }

  users = users.filter((user) => user.id !== id);

  return {
    data: null,
    statusCode: 204,
  };
}

export default { getAll, getById, createOne, updateOne, deleteOne };
