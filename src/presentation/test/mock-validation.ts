import { Validation } from '@/presentation/protocols/validation';
export class ValidationSpy implements Validation {
    errorMessage: string
    fieldName: string
    fieldVale: string

    validate(fieldName: string, fieldVale: string): string {
        this.fieldName = fieldName
        this.fieldVale = fieldVale
        return this.errorMessage
    }
}