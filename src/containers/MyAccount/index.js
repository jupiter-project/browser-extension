
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { useAccount } from 'contexts/account-context'
import Layout from 'Layout';
import Logo from 'components/Logo'
import SendButton from 'parts/SendButton'
import AccountDetails from './AccountDetails'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  balance: {
    fontSize: 24,
    color: theme.palette.primary.main,
    margin: theme.spacing(3, 0)
  },
}));

const MyAccount = () => {
  const classes = useStyles();
  const { accountInfo } = useAccount();

  return (
    <Layout>
      <Logo size={40} />
      <Typography
        align='center'
        className={classes.balance}
      >
        {parseInt(accountInfo?.balanceNQT || 0, 10) / NQT_WEIGHT} JUP
      </Typography>
      <SendButton />
      <AccountDetails />
    </Layout>
  )
}

export default memo(MyAccount)