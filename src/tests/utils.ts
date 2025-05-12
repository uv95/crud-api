export const res = {
  writeHead: jest.fn(),
  end: jest.fn(),
} as any;

export function getResponse() {
  return JSON.parse(res.end.mock.calls[0][0]);
}

export function getResponseHeaders(statusCode: number) {
  return [statusCode, { 'Content-Type': 'application/json' }];
}

export function addMockedEventListener(data: object) {
  return jest.fn().mockImplementation((event, callback) => {
    if (event === 'data') {
      callback(Buffer.from(JSON.stringify(data)));
    }
    if (event === 'end') {
      callback();
    }
  });
}

export const invalidDataTestCases = [
  {
    username: 123,
    age: 33,
    hobbies: ['hobby'],
  },
  {
    age: 33,
    hobbies: ['hobby'],
  },
  {
    username: 'Test User',
    age: '33',
    hobbies: [],
  },
  {
    username: 'Test User',
    age: 33,
    hobbies: 'hobby',
  },
  {
    username: 'Test User',
    age: 33,
    hobbies: [1, 2, 3],
  },
];

export const testUser = {
  id: '1',
  username: 'Test User',
  hobbies: [],
  age: 30,
};
