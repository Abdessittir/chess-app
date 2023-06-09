import { request } from '../../utils/request';

const requests = {
  signup: () => request({
    method: 'post',
    body: JSON.stringify({
      username: "username",
      email: "username@gmail.com",
      password: "kljsfdlmsdlsmdds"
    }),
  }, 'api/v1/auth/signup'),
  signin: () => request({
    method: 'post',
    body: JSON.stringify({
      email: "username@gmail.com",
      password: "kljsfdlmsdlsmdds"
    }),
  }, 'api/v1/auth/signin'),
};

jest.setTimeout(60000);

interface Response {
  status: string,
  value: {
    status: number,
    data: any,
  }
};

describe("Test the signup and signin routes", () => {
  let responses: Response[];
  beforeAll(async () => {
    // send all requests in parallel
    responses = await Promise.allSettled(Object.values(requests).map(req => req()))as Response[]
  });
  // signup route
  test("It should respond to the post method for signup route", () => {
    const { status, data}  = responses[0].value;

    // Assertion
    expect(status).toBe(201);
    expect(data.email).toBe("username@gmail.com");
  });
});