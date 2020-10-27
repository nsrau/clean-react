import React from 'react'
import { Login } from '@/presentation/pages'
import makeRemoteAuthentication from '@/main/factories/useCases/authentication/remote-authentication-factory'
import makeLoginValidation from './login-validation-factory'
import makeLocalSaveAccessToken from '@/main/factories/useCases/save-access-token/local-save-access-token-factory'

const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}

export default makeLogin
