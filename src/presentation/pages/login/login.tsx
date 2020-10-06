import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        emailError: 'field required',
        passwordError: 'field required',
        mainError: ''
    })

    useEffect(() => {
        validation.validate({ email: state.email })
    }, [state.email])

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form}>
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="insert your email" />
                    <Input type="password" name="password" placeholder="insert your password" />
                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Submit</button>
                    <span className={Styles.link}>Create account</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login
