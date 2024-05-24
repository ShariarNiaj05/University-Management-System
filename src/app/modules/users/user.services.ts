import config from '../../config';
import { TStudent } from '../students/students.interface';
import Student from '../students/students.model';
import { TUser } from './user.interface';
import User from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  /* if (await User.isUserExists(studentData.id)) {
    throw new Error('Student Already Exists');
  } */
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.Default_Pass as string);

  // set student role
  userData.role = 'student';

  // set manually generate id
  userData.id = '2030100001';

  // create a user
  const NewUser = await User.create(userData);

  // create a student
  if (Object.keys(NewUser).length) {
    //   set id, _id as user
    studentData.id = NewUser.id; //embedded id
    studentData.user = NewUser._id; //reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
