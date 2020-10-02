export type HttpPostParams = {
    url: string
    body?: any
}

export interface HttpPostClient {
    post(params: HttpPostParams): Promise<void>
}
