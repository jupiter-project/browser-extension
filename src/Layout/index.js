
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useAccount } from 'contexts/account-context'
import Logo from 'components/Logo'

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    boxShadow: 'none',
    height: theme.custom.layout.topAppBarHeight,
    backgroundColor: theme.palette.background.primary
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  account: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(3, 2)
  }
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();
  const { accountInfo } = useAccount();

  return (
    <main>
      <AppBar
        position='relative'
        className={classes.appBar}
      >
        <Toolbar className={classes.toolBar}>
          <Logo size={35} />
          <CopyToClipboard
            text={accountInfo.accountRS}
            onCopy={() => alert(`${accountInfo.accountRS} Copied!`)}
          >
            <Typography className={classes.account}>
              {accountInfo.accountRS}
            </Typography>
          </CopyToClipboard>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {children}
      </div>
    </main>
  );
};

export default memo(Layout);
