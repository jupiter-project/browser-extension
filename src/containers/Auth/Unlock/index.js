
import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useRoutes } from 'contexts/router-context'
import { useAccount } from 'contexts/account-context'
import { useNotify } from 'contexts/notify-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import LINKS from 'utils/constants/links'
import { PASSWORD_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signin: {
    paddingLeft: theme.spacing(1)
  }
}));

const schema = yup.object().shape({
  password: PASSWORD_VALID
});

const Unlock = () => {
  const classes = useStyles();
  const authClasses = authPageStyles();
  const { setLoading } = useRoutes()
  const { onUnlock } = useAccount()
  const { onNotify } = useNotify()

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const response = await onUnlock(data.password);
      if (!response) {
        onNotify(MESSAGES.WRONG_PASSWORD)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [setLoading, onUnlock, onNotify]);

  return (
    <AuthWrapper>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<MagicTextField />}
          type='password'
          name='password'
          label='Password'
          error={errors.password?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <ContainedButton
          type='submit'
          className={authClasses.button}
        >
          Unlock
        </ContainedButton>
        <div className={classes.footer}>
          <LinkButton
            href={LINKS.SIGN_IN}
            className={classes.signin}
          >
            Login with passphrase
          </LinkButton>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default memo(Unlock)