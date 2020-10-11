import { FieldValidation } from '@/validation/protocols/field-validation';
import { Validation } from '@/presentation/protocols/validation';

export class ValidationComposite implements Validation {
    constructor(private readonly validators: FieldValidation[]) { }

    validate(fieldName: string, fieldVale: string): string {
        const validators = this.validators.filter(v => v.field === fieldName)
        for (const validator of validators) {
            const error = validator.validate(fieldVale)
            if (error) {
                return error.message
            }
        }
    }
}