import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Mandatory field',
    emailError: 'Mandatory field',
    passwordError: 'Mandatory field',
    passwordConfirmationError: 'Mandatory field',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
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
