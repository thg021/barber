import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

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

    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRouter;
