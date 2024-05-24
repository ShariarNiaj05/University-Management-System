import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.serivice';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting All The Student Was Successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getStudentFromDBById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Getting single Student Was Successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDBById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleting single Student Was Successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
