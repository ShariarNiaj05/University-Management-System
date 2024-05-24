import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();
// const port = process.env.PORT;

// parser

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/users/', UserRoutes);

const getControllerNamedA = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};

app.get('/', getControllerNamedA);

export default app;
