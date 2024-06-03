import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.patch(
  '/update-course',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);
router.patch('/:id', CourseControllers.deleteCourse);
router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
