import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form} >
          <h2>Create account</h2>
          <Input type="text" name="name" placeholder="insert your name" />
          <Input type="email" name="email" placeholder="insert your email" />
          <Input type="password" name="password" placeholder="insert your password" />
          <Input type="password" name="passwordConfirmation" placeholder="repeat your password" />
          <button className={Styles.submit} type="submit">Submit</button>
          <Link to="/login" className={Styles.link}>Back login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
