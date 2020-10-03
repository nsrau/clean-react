import { AccountModel } from '@/domain/models';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
    ) { }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}
