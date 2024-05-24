import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20, { message: 'Maximum of 20 characters allowed' }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationSchema,
};
