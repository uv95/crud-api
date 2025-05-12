import { handleUsers } from './user.controller';
import user from '../services/user.service';
import { v4 as uuidv4, validate } from 'uuid';
import { Methods } from '../utils/types';

jest.mock('uuid', () => ({
  validate: jest.fn(),
  v4: jest.fn(),
}));

const res = {
  writeHead: jest.fn(),
  end: jest.fn(),
} as any;

const testUser = {
  id: '1',
  username: 'Test User',
  hobbies: [],
  age: 30,
};

const { users } = user;

describe('1 scenario', () => {
  test('should return empty array when users.getAll is called', () => {
    const mockedResponse = {
      data: [],
      statusCode: 200,
    };

    const req = {
      method: Methods.GET,
      url: '/api/users',
    } as any;

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(getResponse()).toEqual(mockedResponse);
    expect(users.length).toBe(0);
  });

  test('should create new user', () => {
    const mockedResponse = {
      data: testUser,
      statusCode: 201,
    };
    const req = {
      method: Methods.POST,
      url: '/api/users',
      on: addMockedEventListener({ ...testUser }),
    } as any;

    jest.spyOn(user, 'createOne');
    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.createOne).toHaveBeenCalledWith({ ...testUser });
    expect(getResponse()).toEqual(mockedResponse);
    expect(users.length).toBe(1);
  });

  test('should get user by id', () => {
    const mockedResponse = {
      data: testUser,
      statusCode: 200,
    };

    const req = {
      method: Methods.GET,
      url: `/api/users/${testUser.id}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'getById');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.getById).toHaveBeenCalledWith(testUser.id);
    expect(getResponse()).toEqual(mockedResponse);
  });

  test('should update user', () => {
    const updatedData = {
      username: 'Test User Updated',
      age: testUser.age,
      hobbies: testUser.hobbies,
    };
    const mockedResponse = {
      data: { ...updatedData, id: testUser.id },
      statusCode: 200,
    };

    const req = {
      method: Methods.PUT,
      url: `/api/users/${testUser.id}`,
      on: addMockedEventListener({ ...updatedData }),
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'updateOne');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.updateOne).toHaveBeenCalledWith(testUser.id, updatedData);
    expect(getResponse()).toEqual(mockedResponse);
  });

  test('should delete user', () => {
    const mockedResponse = {
      data: null,
      statusCode: 204,
    };

    const req = {
      method: Methods.DELETE,
      url: `/api/users/${testUser.id}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'deleteOne');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.deleteOne).toHaveBeenCalledWith(testUser.id);
    expect(getResponse()).toEqual(mockedResponse);
  });

  test('should receive 404 and error when requesting deleted user', () => {
    const mockedResponse = {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
    };

    const req = {
      method: 'GET',
      url: `/api/users/${testUser.id}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'getById');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.getById).toHaveBeenCalledWith(testUser.id);
    expect(getResponse()).toEqual(mockedResponse);
  });
});

function getResponse() {
  return JSON.parse(res.end.mock.calls[0][0]);
}

function getResponseHeaders(statusCode: number) {
  return [statusCode, { 'Content-Type': 'application/json' }];
}

function addMockedEventListener(data: object) {
  return jest.fn().mockImplementation((event, callback) => {
    if (event === 'data') {
      callback(Buffer.from(JSON.stringify(data)));
    }
    if (event === 'end') {
      callback();
    }
  });
}
