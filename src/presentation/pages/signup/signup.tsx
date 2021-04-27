import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.css'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

const errorMsg = 'Mandatory field'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    nameError: '',
    emailError: errorMsg,
    passwordError: errorMsg,
    passwordConfirmationError: errorMsg,
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} >
          <h2>Create account</h2>
          <Input type="text" name="name" placeholder="insert your name" />
          <Input type="email" name="email" placeholder="insert your email" />
          <Input type="password" name="password" placeholder="insert your password" />
          <Input type="password" name="passwordConfirmation" placeholder="repeat your password" />
          <button disabled data-testid="submit" className={Styles.submit} type="submit">Submit</button>
          <span className={Styles.link}>Back login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
