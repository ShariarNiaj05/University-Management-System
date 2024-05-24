import { z } from 'zod';

const userValidationSchema = z.object({
  //   id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password Must be string',
    })
    .max(20, { message: 'Maximum of 20 characters allowed' })
    .optional(),
  //   needsPasswordChange: z.boolean().optional().default(true),
  //   role: z.enum(['admin', 'student', 'faculty']), // // wil be set from api endpoint
  //   status: z.enum(['in-progress', 'blocked']).default('in-progress'), // // this property will be set by default from user model.
  //   isDeleted: z.boolean().optional().default(false),// this property will be set by default from user model.
});

export const userValidation = {
  userValidationSchema,
};
