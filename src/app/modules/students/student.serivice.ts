import Student from './students.model';

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
  getAllStudentsFromDB,
  getStudentFromDBById,
  deleteStudentFromDBById,
};
