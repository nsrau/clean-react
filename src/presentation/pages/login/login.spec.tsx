import React from 'react'
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

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login authentication={authenticationSpy} validation={validationStub} />)

    return {
        sut,
        authenticationSpy
    }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`)
    expect(fieldStatus.title).toBe(validationError || 'ok')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {

    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })

    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        simulateStatusForField(sut, 'email', validationError)
        simulateStatusForField(sut, 'password', validationError)
    })

    test('Should show email error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateStatusForField(sut, 'email', validationError)
    })

    test('Should show password error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)
        simulateStatusForField(sut, 'password', validationError)
    })

    test('Should show valid email state if Validationn succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        simulateStatusForField(sut, 'email')
    })

    test('Should show valid password state if Validationn succeeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        simulateStatusForField(sut, 'password')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('Should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()

        simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email, password
        })
    })

    test('Should call Authentication only once', () => {
        const { sut, authenticationSpy } = makeSut()

        simulateValidSubmit(sut)
        simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        simulateValidSubmit(sut)
        const errorWrap = sut.getByTestId('error-wrap')
        await waitFor(() => errorWrap)
        const mainError = sut.getByTestId('main-error')
        expect(errorWrap.childElementCount).toBe(1)
        expect(mainError.textContent).toBe(error.message)
    })

    test('Should add accessToken to localstorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut)
        await waitFor(() => sut.getByTestId('form'))
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accesstoken)
    })
})
