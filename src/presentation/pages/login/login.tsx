import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/Snipper'
import Logo from '@/presentation/components/logo/Logo'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <header className={Styles.header}>
                <Logo />
                <h1>clean react</h1>
            </header>
            <form className={Styles.form}>
                <h2>Login</h2>
                <div className={Styles.inputWrap}>
                    <input type="email" name="email" placeholder="insert your email" />
                    <span className={Styles.status}>🔴</span>
                </div>
                <div className={Styles.inputWrap}>
                    <input type="password" name="password" placeholder="insert your password" />
                    <span className={Styles.status}>🔴</span>
                </div>
                <button className={Styles.submit} type="submit">Submit</button>
                <span className={Styles.link}>Create account</span>
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>
                        Error
                    </span>
                </div>
            </form>
            <footer className={Styles.footer} />
        </div>
    )
}

export default Login
