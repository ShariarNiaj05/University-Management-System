import { StudentServices } from './student.serivice';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting All The Student Was Successful',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getStudentFromDBById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting single Student Was Successful',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDBById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleting single Student Was Successful',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
