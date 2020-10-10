import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import faker from 'faker'
import 'jest-localstorage-mock'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Router history={history}>
            <Login authentication={authenticationSpy} validation={validationStub} />
        </Router>
    )

    return {
        sut,
        authenticationSpy
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`)
    expect(fieldStatus.title).toBe(validationError || 'ok')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName)
    expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const element = sut.getByTestId(fieldName)
    expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('Login Component', () => {

    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })

    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        testErrorWrapChildCount(sut, 0)
        testButtonIsDisabled(sut, 'submit', true)

        testStatusForField(sut, 'email', validationError)
        testStatusForField(sut, 'password', validationError)
    })

    test('Should show email error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        testStatusForField(sut, 'email', validationError)
    })

    test('Should show password error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)
        testStatusForField(sut, 'password', validationError)
    })

    test('Should show valid email state if Validationn succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        testStatusForField(sut, 'email')
    })

    test('Should show valid password state if Validationn succeeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        testStatusForField(sut, 'password')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        testButtonIsDisabled(sut, 'submit', false)
    })

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        testElementExists(sut, 'spinner')
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()

        await simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({ email, password })
    })

    test('Should call Authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut()

        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if form is invalid', async () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        populateEmailField(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        testErrorWrapChildCount(sut, 1)
        testElementText(sut, 'main-error', error.message)
    })

    test('Should add accessToken to localstorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accesstoken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to signup page', async () => {
        const { sut } = makeSut()
        const signup = sut.getByTestId('signup')
        fireEvent.click(signup)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })
})
