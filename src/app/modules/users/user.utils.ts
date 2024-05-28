import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // 203001 0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  /* 
    (0).toString().padStart(4, '0') == "0000"
    (10).toString().padStart(4, '0') == "0010"
    (16).toString().padStart(4, '0') == "0016"
    (118).toString().padStart(4, '0') == "0118"
    */

  let currentID = (0).toString(); //0000 by default
  const lastStudentID = await findLastStudentId();
  // 2020 01 0001
  const lastStudentYear = lastStudentID?.substring(0, 4); // 2030
  const lastStudentSemesterCode = lastStudentID?.substring(4, 6); // 01
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;
  if (
    lastStudentID &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentID = lastStudentID.substring(6);
  }
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
