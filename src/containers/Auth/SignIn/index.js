
import { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useRoutes } from 'contexts/router-context'
import { useAccount } from 'contexts/account-context'
import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import AccountTextField from 'components/UI/TextFields/AccountTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import LINKS from 'utils/constants/links'
import { ACCOUNT_VALID } from 'utils/constants/validations'
import TEXT_MASKS from 'utils/constants/text-masks'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex'
  },
  signup: {
    paddingLeft: theme.spacing(1)
  }
}));

const schema = yup.object().shape({
  account: ACCOUNT_VALID
});

const SignIn = () => {
  const classes = useStyles();
  const authClasses = authPageStyles();
  const { routePush, setLoading } = useRoutes()
  const { setAccount } = useAccount()

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const response = await jupiterAPI.getAccountByAccountID(data.account);
      if (!response?.accountRS) {
        setLoading(false)
        return;
      }

      setAccount(response);
      routePush(LINKS.MY_ACCOUNT)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [routePush, setLoading, setAccount]);

  return (
    <AuthWrapper>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<AccountTextField />}
          name='account'
          label='JUP Address'
          placeholder='JUP-____-____-____-_____'
          mask={TEXT_MASKS.ACCOUNT}
          error={errors.account?.message}
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