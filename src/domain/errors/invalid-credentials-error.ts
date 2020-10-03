export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid Credential')
        this.name = 'InvalidCredentialsError'
    }
}