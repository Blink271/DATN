export class BadRequestError extends Error {
    statusCode: number;
    constructor(message: string) {
      super(message);
      this.statusCode = 400;
      this.name = 'BadRequestError';
    }
  }
  
  export class UnauthorizedError extends Error {
    statusCode: number;
    constructor(message: string) {
      super(message);
      this.statusCode = 401;
      this.name = 'UnauthorizedError';
    }
  }