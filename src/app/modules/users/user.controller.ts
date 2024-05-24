import { Request, Response } from 'express';
import { userValidation } from './user.validation';
import { UserService } from './user.services';
import config from '../../config';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = userValidation.userValidationSchema(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);
    return result;
  } catch (err) {
    console.log(err);
  }
};
