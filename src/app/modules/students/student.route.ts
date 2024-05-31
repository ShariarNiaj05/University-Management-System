import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

// will call controller
router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);
router.delete('/:id', StudentControllers.deleteSingleStudent);

// need to export to use in app.ts file
export const StudentRoutes = router;
