import { memo, useState, useEffect, useCallback } from 'react'
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
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import generatePassphrase from 'utils/helpers/generatePassphrase'
import LINKS from 'utils/constants/links'
// import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(1)
  },
  footer: {
    display: 'flex',
  },
  signIn: {
    paddingLeft: theme.spacing(1),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const authClasses = authPageStyles();
  const { routePush, setLoading } = useRoutes()
  const { setAccount } = useAccount()

  const [newPassphrase, setNewPassphrase] = useState('');

  useEffect(() => {
    setNewPassphrase(generatePassphrase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = yup.object().shape({
    passphrase: yup
      .string()
      .required('Please input field.')
      .oneOf([newPassphrase], 'Passphrase doesn’t match.'),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const response = await jupiterAPI.getAccountByPassphrase(data.passphrase);
      if (!response?.accountRS) {
        // setPopUp({ text: MESSAGES.AUTH_ERROR })
        setLoading(false)
        return;
      }

      setAccount(response);
      // setPopUp({ text: MESSAGES.SIGN_UP_SUCCESS })
      routePush(LINKS.MY_ACCOUNT);
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [routePush, setAccount, setLoading]);

  return (
    <AuthWrapper>
      <Typography
        variant='body2'
        color='primary'
        className={classes.alert}
      >
        This passphrase is very important. If you lose it, you will permanently
        lose access to your account, there is no way to recover it. Write it
        down carefully and store it in a safe place.
      </Typography>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <MagicTextField
          multiline
          disabled
          label='Passphrase'
          className={authClasses.input}
          value={newPassphrase}
        />
        <Controller
          as={<MagicTextField />}
          type='password'
          name='passphrase'
          label='Confirm Passphrase'
          error={errors.passphrase?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <ContainedButton type='submit' className={authClasses.button}>
          Sign Up
        </ContainedButton>
        <div className={classes.footer}>
          <Typography
            variant='body2'
            color='textSecondary'
            className={classes.footer}
          >
            Already have an account?
          </Typography>
          <LinkButton href={LINKS.SIGN_IN} className={classes.signIn}>
            Log In
          </LinkButton>
        </div>
      </form>
    </AuthWrapper >
  );
};

export default memo(SignUp);
