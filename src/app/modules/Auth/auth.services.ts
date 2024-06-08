import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking if user is exist
  const user = await User.isUserExistByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  /* // checking if the user is already deleted
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
 */

  // checking if the password is correct by using static instance method
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Not Matched');
  }

  console.log(isPasswordMatched);
  // access granted: send accessToken and refreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
