import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRouter;
