
import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as jupiterAPI from 'services/api-jupiter'
import { useRoutes } from 'contexts/router-context'
import { useAccount } from 'contexts/account-context'
import Layout from 'Layout'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/TextFields/MagicTextField'
import AccountTextField from 'components/UI/TextFields/AccountTextField'
import {
  ACCOUNT_VALID,
  PRICE_VALID
} from 'utils/constants/validations'
import TEXT_MASKS from 'utils/constants/text-masks'
import { NQT_WEIGHT } from 'utils/constants/common'
import LINKS from 'utils/constants/links'

const schema = yup.object().shape({
  account: ACCOUNT_VALID,
  amount: PRICE_VALID
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

const SendJup = () => {
  const classes = useStyles();
  const { setLoading } = useRoutes()
  const { accountInfo, passphrase } = useAccount()
  const { routePush } = useRoutes()

  const { control, errors, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const params = {
        receiver: data.account,
        sender: accountInfo.account,
        amount: data.amount * NQT_WEIGHT,
        publicKey: accountInfo.publicKey,
        passphrase
      }

      const response = await jupiterAPI.sendMoney(params);
      if (response?.errorCode) {
        // setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
        setLoading(false)
        return;
      }
      // setPopUp({ text: MESSAGES.SET_ACCOUNT_SUCCESS })
      setValue('amount', '')
      routePush(LINKS.MY_ACCOUNT)
    } catch (error) {
      console.log(error)
      // setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
    }
    setLoading(false)
  }, [accountInfo, passphrase, setLoading, setValue, routePush]);

  return (
    <Layout>
      <form
        noValidate
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          align='center'
          color='primary'
          className={classes.title}
        >
          {parseInt(accountInfo?.balanceNQT || 0, 10) / NQT_WEIGHT} JUP
        </Typography>
        <Controller
          as={<AccountTextField />}
          name='account'
          label='JUP Address'
          placeholder='JUP-____-____-____-_____'
          mask={TEXT_MASKS.ACCOUNT}
          error={errors.account?.message}
          className={classes.input}
          control={control}
          defaultValue=''
        />
        <Controller
          as={<MagicTextField />}
          name='amount'
          label='Amount'
          type='number'
          error={errors.amount?.message}
          className={classes.input}
          control={control}
          defaultValue={''}
        />
        <ContainedButton
          fullWidth
          type='submit'
          className={classes.button}
        >
          Send
        </ContainedButton>
      </form>
    </Layout>
  )
}

export default memo(SendJup)