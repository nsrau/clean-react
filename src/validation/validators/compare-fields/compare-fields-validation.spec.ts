import { CompareFieldsValidation } from "./compare-fields-validation"
import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker'

const makeSut = (valuetoCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valuetoCompare)

describe('CompareFieldValidation', () => {
    test('Should return error if compare is invalid', () => {
        const sut = makeSut(faker.random.word())
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError())
    })

    test('Should return false if compare  is not empty', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())
        expect(error).toBeFalsy()
    })
})
