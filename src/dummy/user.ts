import {User} from "@/interfaces/user";
import {faker} from "@faker-js/faker";

export const viewer: User = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: 'viewer'
}

export const admin: User = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: 'admin'
}
