import { Request, Response } from 'express';
import { UserService } from './user.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = userValidation.userValidationSchema(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Getting single Student Was Successful',
      data: result,
    });
  } catch (err: any | string) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Get single the Students',
      error: err,
    });
  }
};

export const UserController = {
  createStudent,
};
