import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: 'Ocorreu um erro' });
    }
});

export default appointmentRouter;
