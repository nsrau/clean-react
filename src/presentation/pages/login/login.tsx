import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
    isLoading: boolean
    errorMessage: string
}

const Login: React.FC = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        errorMessage: ''
    })

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={state}>
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
