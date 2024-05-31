import mongoose from 'mongoose';
import Student from './students.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import User from '../users/user.model';

const getAllStudentsFromDB = async () => {
  //mongoose built in static method
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

const getStudentFromDBById = async (id: string) => {
  //mongoose built in static method
  // const result = await Student.findOne({ _id: id });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      //if nested ref, i have to write like this
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  return result;
};

const deleteStudentFromDBById = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDBById,
  deleteStudentFromDBById,
};
