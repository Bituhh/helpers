import {APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters} from 'aws-lambda';
import {Logger} from '@bituhh/logger';
import {APIGatewayEvent, APIGatewayPathParameters, APIGatewayQueryStringParameters} from './api-gateway.interface';

/**
 * @description This class is intended to enforce a standard for API payload.
 */
export class Payload {

  [key: string]: any;

  /**
   * @description Attempts to identify the payload that should be passed to the Database based on the method.
   * The resulting payload is mapped as follows:
   * - GET -> Items from API path and query parameter only
   * - PUT -> Items from API path and body only
   * - POST -> Items from API path and body only
   * - DELETE -> Items from API path and query parameter only
   * - HEAD -> Items from API path and query parameter only
   *
   * All other methods are defaulted to API path, query parameter and body. Although using other methods should be avoided!
   */
  static fromMethod(event: APIGatewayEvent): Payload {
    Logger.internal.verbose('Payload.fromMethod');
    Logger.internal.verbose('Determining payload from httpMethod!');
    Logger.internal.debug('Mapping payload for method:', event.httpMethod);
    switch (event.httpMethod) {
      case 'PUT':
      case 'POST':
        return new Payload({
          ...Payload.fromPath(event),
          ...Payload.fromBody(event),
        }, false);
      case 'DELETE':
      case 'GET':
      case 'HEAD':
        return new Payload({
          ...Payload.fromPath(event),
          ...Payload.fromQueryParams(event),
        }, false);
      default:
        return new Payload({
          ...Payload.fromPath(event),
          ...Payload.fromQueryParams(event),
          ...Payload.fromBody(event),
        }, false);
    }
  }

  /**
   * @description Maps all items from `event.body` to an object.
   */
  static fromBody(event: APIGatewayEvent): Payload {
    Logger.internal.verbose('Payload.fromBody');
    Logger.internal.verbose('Checking event.body for nulls!');
    if (!event.body) {
      Logger.internal.verbose('event.body is null, returning empty object!');
      return new Payload();
    }
    Logger.internal.verbose('Parsing data and returning values!');

    try {
      const parsedBody = JSON.parse(event.body);
      return new Payload(parsedBody);
    } catch (e) {
      const message = 'Failed to parse "body" to JSON!';
      Logger.internal.error(433, message);
      throw new Error(message);
    }
  }

  /**
   * @description Maps all items from `event.pathParameters` to an object, it also attempts to parse the items to its correct type. Since `event.pathParameters` is an object of type `{[key: string]: string}` where all values are string. This methods attempts to identify the type of the value and parse it.
   *
   * If event is `{pathParameters: {item1: "test", item2: "2", item3: "[]', item4: '{"obj": "value"}'}}` it will parse the values to `{pathParameters: {item1: "test", item2: 2, item3: [], item4: {obj: "value"}}}`.
   *
   */
  static fromPath(event: APIGatewayEvent): Payload {
    Logger.internal.verbose('Payload.fromPathParams');
    return new Payload(event.pathParameters);
  }

  /**
   * @description Maps all items from `event.queryStringParameters` to an object, it also attempts to parse the items to its correct type. Since `event.queryStringParameters` is an object of type `{[key: string]: string}` where all values are string. This methods attempts to identify the type of the value and parse it.
   *
   * If event is `{pathParameters: {item1: "test", item2: "2", item3: "[]', item4: '{"obj": "value"}'}}` it will parse the values to `{pathParameters: {item1: "test", item2: 2, item3: [], item4: {obj: "value"}}}`.
   *
   */
  static fromQueryParams(event: APIGatewayEvent): Payload {
    Logger.internal.verbose('Payload.fromQueryParams');
    return new Payload(event.queryStringParameters);
  }

  constructor(payload?: { [key: string]: any },
              tryToResolveTypes: boolean = true) {
    Logger.internal.verbose('Payload.determineTypes');
    Logger.internal.verbose('Checking payload for nulls');
    if (!payload) {
      Logger.internal.verbose('Payload is null returning empty object!');
      return this;
    }

    Logger.internal.verbose('Adding data to object');
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        Logger.internal.verbose('Adding new data!');
        if (tryToResolveTypes) {
          this[key] = this.determineType(payload[key]);
        } else {
          this[key] = payload[key];
        }
      }
    }
  }

  private determineType(value: string | undefined | null) {
    Logger.internal.verbose('Payload.determineType');
    Logger.internal.debug(value);
    Logger.internal.verbose('Checking null');
    if (value === 'null' || value === null || value === undefined) {
      return null;
    }
    Logger.internal.verbose('Checking undefined');
    if (value === 'undefined') {
      return undefined;
    }
    const decodedValue = decodeURIComponent(value);
    try {
      Logger.internal.verbose('Trying to parse!');
      return JSON.parse(decodedValue);
    } catch (e) {
      Logger.internal.verbose('Failed to parse, returning as a string!');
      return decodedValue;
    }
  }
}
