import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

//appointmentRouter.get('/', async (request, response) => {
//    const appointmentRepository = getCustomRepository(AppointmentsRepository);
//    const appointments = await appointmentRepository.find();

//    return response.json(appointments);
//});

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const appointmentsRepository = new AppointmentsRepository();

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentsRepository
    );

    const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRouter;
