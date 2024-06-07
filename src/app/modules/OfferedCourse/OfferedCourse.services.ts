import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { OfferedCourse } from './OfferedCourse.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { hasTimeConflict } from './OfferedCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
  // check if the semester registration id is exist---------------------
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration Not Found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  // --------------------

  // check if the academic faculty id is exist---------------------------
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty Not Found');
  }
  // -----------------------------

  // check if the academic department id is exist-----------------
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department Not Found');
  }
  // ----------------------

  // check if the course id is exist-----------------
  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found');
  }
  // ----------------------

  // check if the Faculty id is exist-----------------
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }
  // ----------------------

  // check if the department is belong the correct faculty-----------------
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `'This ${isAcademicDepartmentExist.name} is not belong to ${isAcademicFacultyExist.name}`,
    );
  }
  // ----------------------

  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  // new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  /*   assignedSchedules.forEach(schedule => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This faculty is not available at that time! Choose other time or date!`,
      );
    }
  }); */

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! Choose other time or date!`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  // check if the id is exist-----------------
  const isOfferedCourseExist = await OfferedCourse.findById(id);

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course Not Found');
  }

  // check if the faculty is exist-----------------
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  // get the schedules of the faculties
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  // is offered course status is upcoming
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  // get the schedules for faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  // new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! Choose other time or date!`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
