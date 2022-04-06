import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.css'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <Context.Provider value={{
        state,
        setState
      }}>
        <form className={Styles.form} data-testid="form" onSubmit={handleSubmit}>
          <h2>Create account</h2>
          <Input type="text" name="name" placeholder="insert your name"/>
          <Input type="email" name="email" placeholder="insert your email"/>
          <Input type="password" name="password" placeholder="insert your password"/>
          <Input type="password" name="passwordConfirmation" placeholder="repeat your password"/>
          <button data-testid="submit"
                  disabled={!!state.emailError || !!state.passwordError || !!state.nameError || !!state.passwordConfirmationError}
                  className={Styles.submit} type="submit"
          >
            Submit
          </button>
          <span className={Styles.link}>Back login</span>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer/>
    </div>
  )
}

export default SignUp
