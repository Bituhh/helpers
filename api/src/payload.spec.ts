import {APIGatewayProxyEvent} from 'aws-lambda';
import {Payload} from './payload';

describe('Payload', () => {
  it('should exists', () => {
    expect(Payload).toBeDefined();
  });

  it('should have a property with received from constructor', () => {
    const data = {[Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2)};
    const payload = new Payload(data);
    expect(payload).toEqual(data);
  });

  it('should determine number from stringified value', () => {
    const number = Math.random();
    const payload = new Payload({number: number.toString()});
    expect(payload.number).toEqual(number);
  });

  it('should determine boolean from stringified value', () => {
    const payload = new Payload({
      boolean1: 'true',
      boolean2: 'false',
    });
    expect(payload.boolean1).toEqual(true);
    expect(payload.boolean2).toEqual(false);
  });

  it('should determine null from stringified value', () => {
    const payload = new Payload({nullable: 'null'});
    expect(payload.nullable).toEqual(null);
  });

  it('should determine undefined from stringified value', () => {
    const payload = new Payload({nullable: 'undefined'});
    expect(payload.nullable).toEqual(undefined);
  });

  it('should determine object from stringified value', () => {
    const data = {
      number: Math.random(),
      string: Math.random().toString(36).slice(2),
      boolean: Math.random() > 0.5,
      nullable: null,
    };
    const payload = new Payload({data: JSON.stringify(data)});
    expect(payload.data).toEqual(data);
  });

  it('should not determine object from stringified value', () => {
    const data = JSON.stringify({
      number: Math.random(),
      string: Math.random().toString(36).slice(2),
      boolean: Math.random() > 0.5,
      nullable: null,
    });
    const payload = new Payload({data}, false);
    expect(payload.data).toEqual(data);
  });

  it('should get payload from body', () => {
    const body = {
      [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
    };
    const event = {
      body: JSON.stringify(body),
    };
    expect(Payload.fromBody(event)).toEqual(body);
  });

  it('should get payload from path', () => {
    const event = {
      pathParameters: {
        [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
      },
    };
    expect(Payload.fromPath(event)).toEqual(event.pathParameters);
  });

  it('should get payload from query params', () => {
    const event = {
      queryStringParameters: {
        [Math.random().toString(36).slice(2)]: Math.random().toString(36).slice(2),
      },
    };
    expect(Payload.fromQueryParams(event)).toEqual(event.queryStringParameters);
  });
});
