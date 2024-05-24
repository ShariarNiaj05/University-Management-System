import { Request, Response } from 'express';
import { userValidation } from './user.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const zodParsedData = userValidation.userValidationSchema(studentData);
  } catch (err) {
    console.log(err);
  }
};
