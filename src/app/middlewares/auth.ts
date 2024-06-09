import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //   check if any token available
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized");
    }

    //   have token ? check if the token valid or not
    const verifyToken = jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            "You're not authorized to complete this operation",
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            "You're not authorized to go forward",
          );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
