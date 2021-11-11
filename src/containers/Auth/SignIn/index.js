
import { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useNotify } from 'contexts/notify-context'
import { useRoutes } from 'contexts/router-context'
import { useAccount } from 'contexts/account-context'
import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import LINKS from 'utils/constants/links'
import { PASSPHRASE_VALID, PASSWORD_VALID } from 'utils/constants/validations'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signup: {
    paddingLeft: theme.spacing(1)
  }
}));

const schema = yup.object().shape({
  passphrase: PASSPHRASE_VALID,
  password: PASSWORD_VALID
});

const SignIn = () => {
  const classes = useStyles();
  const authClasses = authPageStyles();
  const { routePush, setLoading } = useRoutes()
  const { setAccount } = useAccount()
  const { onNotify } = useNotify()

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const response = await jupiterAPI.getAccountByPassphrase(data.passphrase);
      if (!response?.accountRS) {
        setLoading(false)
        onNotify(MESSAGES.AUTH_ERROR)
        return;
      }

      setAccount(response.accountRS, data.passphrase, data.password);
      routePush(LINKS.MY_ACCOUNT)
      onNotify(MESSAGES.SIGN_IN_SUCCESS)
    } catch (error) {
      console.log(error)
      onNotify(MESSAGES.AUTH_ERROR)
    }
    setLoading(false)
  }, [routePush, setLoading, setAccount, onNotify]);

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
          name='passphrase'
          label='Passphrase'
          error={errors.passphrase?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
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
          Log In
        </ContainedButton>
        <div className={classes.footer}>
          <Typography
            variant='body2'
            color='textSecondary'
          >
            {'Don\'t have an account?'}
          </Typography>
          <LinkButton
            href={LINKS.SIGN_UP}
            className={classes.signup}
          >
            Create New Account
          </LinkButton>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default memo(SignIn)