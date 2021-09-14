
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
import ValueItem from 'parts/ValueItem'
import {
  ACCOUNT_VALID,
  PRICE_VALID
} from 'utils/constants/validations'
import TEXT_MASKS from 'utils/constants/text-masks'

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

const SendAsset = () => {
  const classes = useStyles();
  const { setLoading, routerParams: { asset = {} } = {} } = useRoutes()
  const { accountInfo, passphrase } = useAccount()

  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      const params = {
        receiver: data.account,
        sender: accountInfo.account,
        asset: asset.asset,
        amount: data.amount * (10 ** asset.decimals),
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
    } catch (error) {
      console.log(error)
      // setPopUp({ text: MESSAGES.SET_ACCOUNT_ERROR })
    }
    setLoading(false)
  }, [asset, accountInfo, passphrase, setLoading]);

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
          {`${asset.quantityQNT / (10 ** asset.decimals)} ${asset.name}`}
        </Typography>
        <ValueItem
          label='Asset'
          value={asset.asset}
        />
        <ValueItem
          label='Description'
          value={asset.description}
        />
        <ValueItem
          label='Quantity'
          value={asset.quantityQNT}
        />
        <ValueItem
          label='Decimals'
          value={asset.decimals}
        />
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

export default memo(SendAsset)