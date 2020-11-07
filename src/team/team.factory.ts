import { createFactory } from 'faker-create-factory';
import { Team } from "./team.entity";

export const TeamFactory = createFactory<Team>(faker => ({
    id: faker.random.number(),
    name: 'foo',
    status: 'active',
    createdAt: '',
    updatedAt: ''
}));