import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/students.interface';
import Student from '../students/students.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  /* if (await User.isUserExists(studentData.id)) {
    throw new Error('Student Already Exists');
  } */
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.Default_Pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // -------------------------------------  transaction and rollback

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    } else {
      throw new Error('Admission Semester Not Found');
    }

    // create a user (transaction 1)
    const NewUser = await User.create([userData], { session });

    // create a user
    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }
    //   set id, _id as user
    payload.id = NewUser[0].id; //embedded id
    payload.user = NewUser[0]._id; //reference id

    // throw new AppError(httpStatus.BAD_REQUEST, 'fake error');
    // crete a student (transaction 2 )

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    // console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create Student');
  }
};

export const UserService = {
  createStudentIntoDB,
};
