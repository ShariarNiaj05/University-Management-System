import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.patch(
  '/update-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

export const SemesterRegistrationRoutes = router;
