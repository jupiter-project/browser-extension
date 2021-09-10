
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import { useAccount } from 'contexts/account-context'
import { useRoutes } from 'contexts/router-context'
import Logo from 'components/Logo'
import NavDropMenu from './NavDropMenu'
import LINKS from 'utils/constants/links'

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
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  copyIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: theme.spacing(3, 2)
  }
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();
  const { accountInfo } = useAccount();
  const { routePush } = useRoutes()

  return (
    <main>
      <AppBar
        position='relative'
        className={classes.appBar}
      >
        <Toolbar className={classes.toolBar}>
          <Logo
            size={30}
            onClick={() => routePush(LINKS.MY_ACCOUNT)}
          />
          <CopyToClipboard
            text={accountInfo.accountRS}
            onCopy={() => alert(`${accountInfo.accountRS} Copied!`)}
          >
            <Typography className={classes.account}>
              {accountInfo.accountRS}
              <FileCopyIcon className={classes.copyIcon} />
            </Typography>
          </CopyToClipboard>
          <NavDropMenu />
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {children}
      </div>
    </main>
  );
};

export default memo(Layout);
