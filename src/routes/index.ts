import { Router } from 'express';
import appointmentRouter from './appointment.routes';
const routes = Router();

routes.use('/appointment', appointmentRouter);

export default routes;
