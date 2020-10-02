import { HttpPostClient } from "../../protocols/http/http-post-client"
import { RemoteAuthentication } from "./remove-authentication"

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
            url?: string
            async post(url: string): Promise<void> {
                this.url = url

                return Promise.resolve()
            }
        }

        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        // system under test
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})
