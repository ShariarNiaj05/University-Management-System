/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
const app: Application = express();
// const port = process.env.PORT;

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/users/', UserRoutes);

// global error handler route
app.use(globalErrorHandler);

// not found route
app.use(notFoundRoute);
export default app;
