import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client"
import { HttpReponse } from "@/data/protocols/http/http-response"

export class HttpPostClientSpy implements HttpPostClient {
    url?: string
    body?: any
    response: HttpReponse = {
        statusCode: HttpStatusCode.ok
    }

    async post(params: HttpPostParams): Promise<HttpReponse> {
        this.url = params.url
        this.body = params.body
        return Promise.resolve(this.response)
    }
}
