
export class InvalidFieldError extends Error {
    constructor() {
        super('Invalid field')
        this.name = 'InvalidFieldError'
    }
}