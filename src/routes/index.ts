import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    const test = 'teste';
    response.json({ message: 'Hello world' });
});
export default routes;
