import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remove-authentication"

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        // system under test
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})
