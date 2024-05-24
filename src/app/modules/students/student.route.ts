import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteSingleStudent);

// need to export to use in app.ts file
export const StudentRoutes = router;
