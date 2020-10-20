import { AuthenticationParams } from "@/domain/usecases/authentication";
import faker from 'faker'
import { AddAccountParams } from "@/domain/usecases";

export const mockAddAccountParams = (): AddAccountParams => {
    const password = faker.internet.password()

    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    }
}
