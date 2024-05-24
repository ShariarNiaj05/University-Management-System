import { TUser } from './user.interface';
import User from './user.model';

const createStudentIntoDB = async (studentData: TUser) => {
  /* if (await User.isUserExists(studentData.id)) {
    throw new Error('Student Already Exists');
  } */
  const result = await User.create(studentData);
  return result;
};

export const UserService = {
  createStudentIntoDB,
};
