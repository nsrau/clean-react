import { Authentication } from '@/domain/usecases/authentication';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import makeAxiosHttpClient from '@/main/factories/http/axios-http-client-factory'
import makeApiUrl from '@/main/factories/http/api-url-factory';

const makeRemoteAuthentication = (): Authentication => {
    return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}

export default makeRemoteAuthentication