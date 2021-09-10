
import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import { useRoutes } from 'contexts/router-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import {
  ACCOUNT_NAME_VALID,
  ACCOUNT_DESCRIPTION_VALID
} from 'utils/constants/validations'
import { useAccount } from 'contexts/account-context'

const schema = yup.object().shape({
  name: ACCOUNT_NAME_VALID,
  description: ACCOUNT_DESCRIPTION_VALID
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 560,
    padding: theme.spacing(3, 0)
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2)
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2, 0)
  }
}));

const EditAccount = () => {
  const classes = useStyles();
  const { setLoading } = useRoutes()
  const { accountInfo, passphrase, setAccount } = useAccount()

  const { control, errors, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const { isDirty } = formState;

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const params = {
        name: data.name,
        description: data.description,
        secretPhrase: passphrase,
        publicKey: accountInfo.publicKey
      }

      const response = await jupiterAPI.setAccountInfo(params);
      if (response?.errorCode) {
        // setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
        setLoading(false)
        return;
      }

      setAccount({
        ...accountInfo,
        name: data.name,
        description: data.description,
      })
      // setPopUp({ text: MESSAGES.SET_ACCOUNT_SUCCESS })
    } catch (error) {
      console.log(error)
      // setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
    }
    setLoading(false)
  }, [accountInfo, passphrase, setAccount, setLoading]);

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        color='primary'
        className={classes.title}
      >
        ACCOUNT INFO
      </Typography>
      <Controller
        as={<MagicTextField />}
        name='name'
        label='Name (max 100 characters)'
        error={errors.name?.message}
        className={classes.input}
        control={control}
        defaultValue={accountInfo?.name || ''}
      />
      <Controller
        as={<MagicTextField />}
        multiline
        rows={6}
        name='description'
        label='Description (max 1000 characters)'
        error={errors.description?.message}
        className={classes.input}
        control={control}
        defaultValue={accountInfo?.description || ''}
      />
      <ContainedButton
        type='submit'
        fullWidth
        disabled={!isDirty}
        className={classes.button}
      >
        Update Account
      </ContainedButton>
    </form>
  )
}

export default memo(EditAccount)