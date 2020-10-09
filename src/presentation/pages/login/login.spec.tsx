import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams
    async auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }
}

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

describe('Login Component', () => {

    afterEach(cleanup)

    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')

    })

    test('Should show email error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
    })

    test('Should show password error if Validationn fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('Should show valid email state if Validationn succeeds', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('ok')
        expect(emailStatus.textContent).toBe('🟢')
    })

    test('Should show valid password state if Validationn succeeds', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('ok')
        expect(passwordStatus.textContent).toBe('🟢')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('Should show spinner on submit', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        const email = faker.internet.email()
        fireEvent.input(emailInput, { target: { value: email } })
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()
        fireEvent.input(passwordInput, { target: { value: password } })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        const spinner = sut.getByTestId('spinner')
        expect(authenticationSpy.params).toEqual({
            email, password
        })
    })
})
