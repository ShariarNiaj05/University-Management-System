import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // // we can create validation in service or we can do it in model using static method

  /* 
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: payload.name,
  });
  if (isDepartmentExist) {
    throw new Error(`${payload.name} Department is already exist`);
  } */

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,

  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
