import React from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form className={Styles.form}>
                <h2>Login</h2>
                <Input type="email" name="email" placeholder="insert your email" />
                <Input type="password" name="password" placeholder="insert your password" />
                <button className={Styles.submit} type="submit">Submit</button>
                <span className={Styles.link}>Create account</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    )
}

export default Login
