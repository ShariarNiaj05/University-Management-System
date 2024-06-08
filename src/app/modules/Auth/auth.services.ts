import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking if user is exist
  const isUserExist = await User.findOne({ id: payload.id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  // checking if the user is already deleted
  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  // checking if the user is blocked
  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist.password,
  );

  console.log(isPasswordMatched);
  // access granted: send accessToken and refreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
