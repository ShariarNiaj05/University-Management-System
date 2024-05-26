import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createAcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await createAcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
