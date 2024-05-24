import { error } from 'console';
import { TStudent } from './students.interface';
import Student from './students.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //mongoose built in static method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await Student.create(studentData);

  // mongoose built in instance method
  /* const student = new Student(studentData); //create an instance
  if (await student.isUserExits(studentData.id)) {
    throw new Error('User already exists');
  } */

  // NOTE: custom instance method added in student.interface.ts
  // const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  //mongoose built in static method
  const result = await Student.find();
  return result;
};

const getStudentFromDBById = async (id: string) => {
  //mongoose built in static method
  // const result = await Student.findOne({ _id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDBById = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentFromDBById,
  deleteStudentFromDBById,
};
