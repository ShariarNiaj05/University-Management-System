import { object } from 'joi';
import config from '../../config';
import { TStudent } from '../students/students.interface';
import { NewUser } from './user.interface';
import User from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  /* if (await User.isUserExists(studentData.id)) {
    throw new Error('Student Already Exists');
  } */
  // create a user
  const user: NewUser = {};

  // if password is not given, use default password
  user.password = password || (config.Default_Pass as string);

  // set student role
  user.role = 'student';

  // set manually generate id
  user.id = '2030100001';

  // create a user
  const result = await User.create(user);

  // create a student
  if (Object.keys(result).length) {
    //   set id, _id as user
    studentData.id = result.id;

    studentData.user = result._id;
  }

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
