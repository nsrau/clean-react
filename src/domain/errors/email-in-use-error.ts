export class EmailInUseError extends Error {
    constructor() {
        super('Email in use')
        this.name = 'EmailInUseError'
    }
}