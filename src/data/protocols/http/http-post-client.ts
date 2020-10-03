import { HttpReponse } from "@/data/protocols/http/http-response";

export type HttpPostParams = {
    url: string
    body?: any
}

export interface HttpPostClient {
    post(params: HttpPostParams): Promise<HttpReponse>
}
