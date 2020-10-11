import { FieldValidation } from '@/validation/protocols/field-validation';
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) { }
    validate(value: string): Error {
        const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (!value || emailRegex.test(value)) ? null : new InvalidFieldError()
    }
}
