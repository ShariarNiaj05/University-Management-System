import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/students.interface';
import Student from '../students/students.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

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

  //set  generated id
  if (admissionSemester) {
    userData.id = await generateStudentId(admissionSemester);
  } else {
    throw new Error('Admission Semester Not Found');
  }
  // create a user
  const NewUser = await User.create(userData);

  // create a student
  if (Object.keys(NewUser).length) {
    //   set id, _id as user
    payload.id = NewUser.id; //embedded id
    payload.user = NewUser._id; //reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
