import { handleUsers } from '../controllers/user.controller';
import user from '../services/user.service';
import { v4 as uuidv4, validate } from 'uuid';
import { Methods } from '../utils/types';
import {
  addMockedEventListener,
  getResponse,
  getResponseHeaders,
  res,
  testUser,
  TEST_ID,
} from './utils';

jest.mock('uuid', () => ({
  validate: jest.fn(),
  v4: jest.fn(() => TEST_ID),
}));

const { users } = user;

describe('Scenario 1', () => {
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
      data: { ...testUser, id: TEST_ID },
      statusCode: 201,
    };
    const req = {
      method: Methods.POST,
      url: '/api/users',
      on: addMockedEventListener(mockedResponse.data),
    } as any;

    jest.spyOn(user, 'createOne');
    handleUsers({ req, res });

    expect(uuidv4).toHaveBeenCalled();
    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.createOne).toHaveBeenCalledWith(mockedResponse.data);
    expect(getResponse()).toEqual(mockedResponse);
    expect(users.length).toBe(1);
  });

  test('should get user by id', () => {
    const mockedResponse = {
      data: { ...testUser, id: TEST_ID },
      statusCode: 200,
    };

    const req = {
      method: Methods.GET,
      url: `/api/users/${TEST_ID}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'getById');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.getById).toHaveBeenCalledWith(TEST_ID);
    expect(getResponse()).toEqual(mockedResponse);
  });

  test('should update user', () => {
    const updatedData = {
      username: 'Test User Updated',
      age: testUser.age,
      hobbies: testUser.hobbies,
    };
    const mockedResponse = {
      data: { ...updatedData, id: TEST_ID },
      statusCode: 200,
    };

    const req = {
      method: Methods.PUT,
      url: `/api/users/${TEST_ID}`,
      on: addMockedEventListener({ ...updatedData }),
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'updateOne');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.updateOne).toHaveBeenCalledWith(TEST_ID, updatedData);
    expect(getResponse()).toEqual(mockedResponse);
  });

  test('should delete user', () => {
    const mockedResponse = {
      data: null,
      statusCode: 204,
    };

    const req = {
      method: Methods.DELETE,
      url: `/api/users/${TEST_ID}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'deleteOne');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.deleteOne).toHaveBeenCalledWith(TEST_ID);
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
      url: `/api/users/${TEST_ID}`,
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'getById');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.getById).toHaveBeenCalledWith(TEST_ID);
    expect(getResponse()).toEqual(mockedResponse);
  });
});
