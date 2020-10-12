import React from 'react'
import { render } from '@testing-library/react'
import Input from './Input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = () {
    
}

describe('Input Component', () => {
    test('Should begin with readOnly', () => {
        const { getByTestId } = render(
            <Context.Provider value={{ state: {} }}>
                <Input name="input" />
            </Context.Provider>
        )
        const input = getByTestId('input') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })
})
