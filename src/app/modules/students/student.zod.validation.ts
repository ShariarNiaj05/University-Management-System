import { z } from 'zod';

const userNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, 'First Name must be at most 10 characters')
    // .regex(/^[A-Z][a-z]*$/, 'First Name must be in capitalize format')
    .nonempty('First Name is Required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last Name is Required')
    .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
    .nonempty('Last Name is Required'),
});

const guardianZodValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's Name is Required"),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().nonempty("Father's No is Required"),
  motherName: z.string().nonempty("Mother's Name is Required"),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().nonempty("Mother's No is Required"),
});

const localGuardianZodValidationSchema = z.object({
  name: z.string().nonempty("Local Guardian's Name is Required"),
  occupation: z.string().optional(),
  contactNo: z.string().nonempty("Local Guardian's Contact no is Required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty('Password is Required'),
    student: z.object({
      name: userNameZodValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: 'Gender is Required and must be male or female',
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Email is not in email format')
        .nonempty('Email is Required'),
      contactNumber: z.string().nonempty('Contact No is Required'),
      emergencyContactNumber: z.string().nonempty('Emergency No is Required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is Required'),
      permanentAddress: z.string().nonempty('Permanent address is Required'),
      guardian: guardianZodValidationSchema,
      localGuardian: localGuardianZodValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
