import { HttpPostParams } from "@/data/protocols/http";
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<string> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})