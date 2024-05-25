import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  console.log(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: '',
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
