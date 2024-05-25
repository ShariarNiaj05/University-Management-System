import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

const router = express.Router();

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Army');
  next();
};

router.post(
  '/create-student',
  validationMiddleware,
  UserController.createStudent,
);

export const UserRoutes = router;
