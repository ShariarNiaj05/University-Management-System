import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /***
   * step:1 > check if the offered course is exist.
   * step:2 > check if the student is already enrolled for the specific course
   * step:3 > if pass the above validation create an enrolled course
   */
  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'student  not found');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student: student._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'You are already enrolled');
  }

  // check if totalCredits exceed maxCredit
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('maxCredit');
  // total enrolled credits + new enrolled course credit > maxCredit then throw an error
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses.totalEnrolledCredits : 0;

  console.log({ enrolledCourses });

  /*  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExist.course,
          student: student._id,
          faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
          // courseMarks: TEnrolledCourseMarks,
          // grade: TGrade,
          // gradePoints: number,
          isCompleted: false,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course enrolled failed');
    }

    const maxCapacity = isOfferedCourseExist.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      {
        new: true,
      },
    );
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `failed to register course ${error}`,
    );
  } */
};

const updateEnrolledCourseMarksIntoDB = async () => {};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
