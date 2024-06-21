/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
// import AcademicSemester from '../academicSemester/academicSemester.model';
// import { TStudent } from '../students/students.interface';
// import Student from '../students/students.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { Faculty } from '../Faculty/faculty.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { generateFacultyId } from '../user/user.utils';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../Faculty/faculty.interface';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  /* if (await User.isUserExists(studentData.id)) {
    throw new Error('Student Already Exists');
  } */
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create Student!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    // console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create Student !!!!');
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = 'faculty';
  //set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
