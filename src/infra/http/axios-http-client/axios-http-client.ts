import { HttpPostClient, HttpPostParams, HttpReponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
    async post(params: HttpPostParams<any>): Promise<HttpReponse<any>> {
        let httpResponse: AxiosResponse<any>

        try {
            httpResponse = await axios.post(params.url, params.body)
        } catch (error) {
            httpResponse = error.response
        }

        return {
            statusCode: httpResponse.status,
            body: httpResponse.data
        }
    }
}