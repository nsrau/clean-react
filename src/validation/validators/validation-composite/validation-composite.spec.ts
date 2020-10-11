import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validaiton';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
    test('Should return error if any validaiton fails', () => {
        const fieldValidationSpy = new FieldValidationSpy('any_field')
        const fieldValidationSpy2 = new FieldValidationSpy('any_field')
        fieldValidationSpy2.error = new Error('any_error_message')
        const sut = new ValidationComposite([
            fieldValidationSpy,
            fieldValidationSpy2
        ])
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('any_error_message')
    })
})
