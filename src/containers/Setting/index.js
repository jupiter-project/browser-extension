
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useAccount } from 'contexts/account-context'
import Layout from 'Layout'
import EditAccount from './EditAccount'

const useStyles = makeStyles((theme) => ({
  passphrase: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8
  },
  divider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.custom.palette.border
  }
}));

const Setting = () => {
  const classes = useStyles();
  const { passphrase } = useAccount();

  return (
    <Layout>
      <CopyToClipboard
        text={passphrase}
        onCopy={() => alert(`${passphrase} Copied!`)}
      >
        <Typography className={classes.passphrase}>
          {passphrase}
        </Typography>
      </CopyToClipboard>
      <Divider orientation='vertical' className={classes.divider} />
      <EditAccount />
    </Layout>
  )
}

export default memo(Setting)