import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, needPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      refreshToken,
      needPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
