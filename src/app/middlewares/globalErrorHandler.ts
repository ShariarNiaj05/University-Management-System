/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'There is an error',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'this is zod err';
    // errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};

export default globalErrorHandler;

/***
 * PATTERN
 *
 * success
 * message
 * errorSources: [
 * path: ""
 * message: ""
 * ]
 * stack
 */
