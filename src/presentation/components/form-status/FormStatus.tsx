import React, { useContext } from 'react'
import Spinner from '@/presentation/components/spinner/Snipper'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
    const { state } = useContext(Context)
    const { isLoading, mainError } = state
    return (
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {mainError && <span className={Styles.error}>
                {mainError}
            </span>}
        </div>
    )
}

export default FormStatus