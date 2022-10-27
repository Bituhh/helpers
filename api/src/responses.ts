import {Logger} from '@bituhh/logger';
import {APIGatewayProxyEvent} from 'aws-lambda';

const STAGE = process.env.STAGE ?? process.env.stage ?? 'dev';
const LOCALHOST_PORT = process.env.LOCALHOST_PORT ?? process.env.localhost_port ?? 8100;

interface ResponseHeaders {
  [key: string]: string;
}

export class Responses {
  public statusCode: number;
  public body: string;
  public headers: ResponseHeaders = {};

  /**
   * @description The request succeeded. The result meaning of "success" depends on the HTTP method:
   *
   * - GET: The resource has been fetched and transmitted in the message body.
   * - HEAD: The representation headers are included in the response without any message body.
   * - PUT or POST: The resource describing the result of the action is transmitted in the message body.
   * - TRACE: The message body contains the request message as received by the server.
   */
  static success(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.success');
    const result = new Responses(200, message, data, headers);
    Logger.internal.debug(result);
    return result;
  }

  /**
   * @description The server has encountered a situation it does not know how to handle.
   */
  static internalError(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.internalError');
    return Responses.error(500, message, data, headers);
  }

  /**
   * @description The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   */
  static notImplemented(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.notImplemented');
    return Responses.error(501, message, data, headers);
  }

  /**
   * @description The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
   */
  static badRequest(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.badRequest');
    return Responses.error(400, message, data, headers);
  }

  /**
   * @description Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
   */
  static unauthorized(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.unauthorized');
    return Responses.error(401, message, data, headers);
  }

  /**
   * @description The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
   */
  static forbidden(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.forbidden');
    return Responses.error(403, message, data, headers);
  }

  /**
   * @description The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
   */
  static notFound(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.notFound');
    return Responses.error(404, message, data, headers);
  }

  /**
   * @description The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.
   */
  static methodNotAllowed(message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.methodNotAllowed');
    return Responses.error(405, message, data, headers);
  }

  /**
   * @description This method returns a standard API error message based on `statusCode`. It is also the base method for all the other error methods.
   */
  static error(statusCode: number, message: string, data?: any, headers?: ResponseHeaders): Responses {
    Logger.internal.verbose('Responses.error');
    const response = new Responses(statusCode, message, data, headers);
    Logger.internal.error(statusCode, response);
    return response;
  }

  constructor(statusCode: number, message: string, data?: any, headers?: ResponseHeaders) {
    Logger.internal.verbose('Responses.constructor');

    Logger.internal.verbose('Assigning values to class properties!');
    this.statusCode = statusCode;

    if (data) {
      Logger.internal.verbose('Adding data parameter to body!');
      this.body = JSON.stringify({
        message,
        data,
      });
    } else {
      this.body = JSON.stringify({message});
    }

    if (headers) {
      this.headers = headers;
    }
  }

  setCorsHeaders(event: APIGatewayProxyEvent,
                 allowedOrigins: string[],
                 allowedMethods: string[]): Responses {
    Logger.internal.verbose('Responses.getHeadersWithCors');

    Logger.internal.verbose('Setting default cors parameters!');
    this.headers['Access-Control-Allow-Headers'] = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent';
    this.headers['Access-Control-Allow-Methods'] = allowedMethods.join(',');

    Logger.internal.verbose('Setting allowed origin!');
    const origin = event.headers.origin as string;
    if (allowedOrigins.includes(origin)) {
      Logger.internal.verbose('Request is from an allowed origin!');
      this.headers['Access-Control-Allow-Origin'] = origin;
    } else if (STAGE === 'dev') {
      Logger.internal.verbose(`Current STAGE is dev setting origin to localhost with port ${LOCALHOST_PORT}`);
      this.headers['Access-Control-Allow-Origin'] = `http://localhost:${LOCALHOST_PORT}`;
    }
    return this;
  }
}
