export enum HttpStatusCode {
    noContent = 204,
    ok = 200,
    badRequest = 400,
    unathorized = 401,
    notFound = 404,
    serverError = 500
}

export type HttpReponse<T> = {
    statusCode: number
    body?: T
}