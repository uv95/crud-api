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
  invalidDataTestCases,
} from './utils';

jest.mock('uuid', () => ({
  validate: jest.fn(),
  v4: jest.fn(() => TEST_ID),
}));

const { users } = user;

describe('Scenario 3', () => {
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

  test.each(invalidDataTestCases)(
    'should return 400 and error when trying to create user with invalid data',
    (invalidData) => {
      const mockedResponse = {
        data: null,
        statusCode: 400,
        message: 'Required fields not provided, or data type is wrong!',
      };
      const req = {
        method: Methods.POST,
        url: '/api/users',
        on: addMockedEventListener({ ...invalidData, id: TEST_ID }),
      } as any;

      jest.spyOn(user, 'createOne');
      handleUsers({ req, res });

      expect(uuidv4).not.toHaveBeenCalled();
      expect(res.writeHead).toHaveBeenCalledWith(
        ...getResponseHeaders(mockedResponse.statusCode)
      );
      expect(user.createOne).toHaveBeenCalledWith({
        ...invalidData,
        id: TEST_ID,
      });
      expect(getResponse()).toEqual(mockedResponse);
      expect(users.length).toBe(0);
    }
  );

  test('should return 400 and error when requesting non-existent user by id', () => {
    const mockedResponse = {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
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

  test('should return 404 and error when updating non-existent user', () => {
    const mockedResponse = {
      data: null,
      statusCode: 404,
      message: "User doesn't exist!",
    };

    const req = {
      method: Methods.PUT,
      url: `/api/users/${TEST_ID}`,
      on: addMockedEventListener(testUser),
    } as any;

    (validate as jest.Mock).mockReturnValue(true);
    jest.spyOn(user, 'updateOne');

    handleUsers({ req, res });

    expect(res.writeHead).toHaveBeenCalledWith(
      ...getResponseHeaders(mockedResponse.statusCode)
    );
    expect(user.updateOne).toHaveBeenCalledWith(TEST_ID, testUser);
    expect(getResponse()).toEqual(mockedResponse);
  });
});
