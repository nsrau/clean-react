import React from 'react'
import { Login } from '@/presentation/pages'
import makeRemoteAuthentication from '@/main/factories/useCases/authentication/remote-authentication-factory'
import makeLoginValidation from './login-validation-factory'

const makeLogin: React.FC = () => {
    return (
        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
        />
    )
}

export default makeLogin