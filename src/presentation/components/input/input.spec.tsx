import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './Input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
    return render(
        <Context.Provider value={{ state: {} }}>
            <Input name="input" />
        </Context.Provider>
    )
}

describe('Input Component', () => {
    test('Should begin with readOnly', () => {
        const sut = makeSut()
        const input = sut.getByTestId('input') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })

    test('Should remove readOnly', () => {
        const sut = makeSut()
        const input = sut.getByTestId('input') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })
})
