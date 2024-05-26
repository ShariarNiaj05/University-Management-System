import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

export const generateStudentId = (payload: TAcademicSemester) => {
  /* 
    (0).toString().padStart(4, '0') == "0000"
    (10).toString().padStart(4, '0') == "0010"
    (16).toString().padStart(4, '0') == "0016"
    (118).toString().padStart(4, '0') == "0118"
    */
  const currentID = (0).toString();
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
