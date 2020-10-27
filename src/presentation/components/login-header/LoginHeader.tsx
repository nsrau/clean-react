import React, { memo } from 'react'
import Logo from '@/presentation/components/logo/Logo'
import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>clean react</h1>
    </header>
  )
}

export default memo(LoginHeader)
