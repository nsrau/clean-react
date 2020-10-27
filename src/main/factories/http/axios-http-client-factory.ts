import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

export default makeAxiosHttpClient
