import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remove-authentication"
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    // system under test
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url()

        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})
