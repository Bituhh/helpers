import {Logger} from '@bituhh/logger'
Logger.error = jest.fn(); // Surpress all the Logger.error output
import {Responses} from './responses';

describe('Responses', () => {
  it('should exist', () => {
    expect(Responses).toBeDefined();
  });

  describe('constructor', () => {
    it('should assign statusCode correctly', () => {
      const statusCode = Math.random();
      const response = new Responses(statusCode, 'Success');

      expect(response.statusCode).toEqual(statusCode);
    });

    it('should assign message to body as a JSON string', () => {
      const message = Math.random().toString(36).slice(2);
      const response = new Responses(200, message);

      expect(response.body).toEqual(JSON.stringify({message}));
    });

    it('should assign message and data to body as a JSON string', () => {
      const message = Math.random().toString(36).slice(2);
      const data = Math.random();
      const response = new Responses(200, message, data);

      expect(response.body).toEqual(JSON.stringify({message, data}));
    });

    it('should assign headers correctly', () => {
      const headers = {
        [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
      };
      const response = new Responses(200, 'Success', 'Some Value', headers);

      expect(response.headers).toEqual(headers);
    });
  });

  describe('Responses.error', () => {
    it('should assign statusCode correctly', () => {
      const statusCode = Math.random();
      const response = Responses.error(statusCode, 'Some random error');

      expect(response.statusCode).toEqual(statusCode);
    });

    it('should assign message to body as a JSON string', () => {
      const message = Math.random().toString(36).slice(2);
      const response = Responses.error(400, message);

      expect(response.body).toEqual(JSON.stringify({message}));
    });

    it('should assign message and data to body as a JSON string', () => {
      const message = Math.random().toString(36).slice(2);
      const data = Math.random();
      const response = new Responses(400, message, data);

      expect(response.body).toEqual(JSON.stringify({message, data}));
    });

    it('should assign headers correctly', () => {
      const headers = {
        [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
      };
      const response = new Responses(400, 'Some random error', 'Some Value', headers);

      expect(response.headers).toEqual(headers);
    });
  });


  const staticHelpers = [
    {name: 'success', statusCode: 200, run: Responses.success},
    {name: 'internalError', statusCode: 500, run: Responses.internalError},
    {name: 'notImplemented', statusCode: 501, run: Responses.notImplemented},
    {name: 'badRequest', statusCode: 400, run: Responses.badRequest},
    {name: 'unauthorized', statusCode: 401, run: Responses.unauthorized},
    {name: 'forbidden', statusCode: 403, run: Responses.forbidden},
    {name: 'notFound', statusCode: 404, run: Responses.notFound},
    {name: 'methodNotAllowed', statusCode: 405, run: Responses.methodNotAllowed},
  ];

  for (const helper of staticHelpers) {
    describe(`Responses.${helper.name}`, () => {
      it('should return an Responses object', () => {
        const response = helper.run(Math.random().toString(36).slice(2));
        expect(response).toBeInstanceOf(Responses);
      });

      it(`should have a statusCode of ${helper.statusCode}`, () => {
        const response = helper.run(Math.random().toString(36).slice(2));
        expect(response.statusCode).toEqual(helper.statusCode);
      });

      it('should have message in body', () => {
        const message = Math.random().toString(36).slice(2);
        const response = helper.run(message);
        expect(response.body).toEqual(JSON.stringify({message}));
      });

      it('should have message and data in body', () => {
        const message = Math.random().toString(36).slice(2);
        const data = Math.random().toString(36).slice(2);
        const response = helper.run(message, data);
        expect(response.body).toEqual(JSON.stringify({message, data}));
      });

      it('should have headers', () => {
        const headers = {
          [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
        };
        const response = helper.run('Header test', 'Header test data', headers);
        expect(response.headers).toEqual(headers);
      });
    });
  }
});
