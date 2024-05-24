import { Request, Response } from 'express';
import { StudentServices } from './student.serivice';
// import studentJoiValidationSchema from './student.joi.validation';

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Getting All The Student Was Successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Get All the Students',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getStudentFromDBById(id);
    res.status(200).json({
      success: true,
      message: 'Getting single Student Was Successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Get single the Students',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDBById(id);
    res.status(200).json({
      success: true,
      message: 'Deleting single Student Was Successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Delete single the Students',
      error: error,
    });
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
};
