import { handleUsers } from '../controllers/user.controller';
import user from '../services/user.service';
import { v4 as uuidv4, validate } from 'uuid';
import { Methods } from '../utils/types';
import {
  addMockedEventListener,
  getResponse,
  getResponseHeaders,
  invalidDataTestCases,
  res,
  TEST_ID,
  testUser,
} from './utils';

jest.mock('uuid', () => ({
  validate: jest.fn(),
  v4: jest.fn(() => TEST_ID),
}));

const { users } = user;

describe('Scenario 2', () => {
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

  test.each(invalidDataTestCases)(
    'should return 400 and error when trying to update user with invalid data',
    (invalidData) => {
      const mockedResponse = {
        data: null,
        statusCode: 400,
        message: 'Data type is wrong!',
      };

      const req = {
        method: Methods.PUT,
        url: `/api/users/${TEST_ID}`,
        on: addMockedEventListener({ ...invalidData }),
      } as any;

      (validate as jest.Mock).mockReturnValue(true);
      jest.spyOn(user, 'updateOne');

      handleUsers({ req, res });

      expect(res.writeHead).toHaveBeenCalledWith(
        ...getResponseHeaders(mockedResponse.statusCode)
      );
      expect(user.updateOne).toHaveBeenCalledWith(TEST_ID, invalidData);
      expect(getResponse()).toEqual(mockedResponse);
    }
  );
});
