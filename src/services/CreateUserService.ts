import User from '../models/User';
import { getRepository } from 'typeorm';
interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('User already exists!');
        }

        const user = userRepository.create({ name, email, password });
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
