
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider, Tooltip } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useAccount } from 'contexts/account-context'
import Layout from 'Layout'
import EditAccount from './EditAccount'

const useStyles = makeStyles((theme) => ({
  passphrase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 90,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
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
  const [showPassphrase, setShowPassphrase] = useState(false);

  return (
    <Layout>
      <CopyToClipboard text={passphrase}>
        <Tooltip
          title="Click to copy"
          onClick={() => setShowPassphrase((prev) => !prev)}
        >
          <Typography className={classes.passphrase}>
            {showPassphrase
              ? passphrase
              : <LockIcon />
            }
          </Typography>
        </Tooltip>
      </CopyToClipboard>
      <Divider orientation='vertical' className={classes.divider} />
      <EditAccount />
    </Layout>
  )
}

export default memo(Setting)