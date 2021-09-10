
import { memo, useCallback, useState } from 'react'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import LockIcon from '@material-ui/icons/Lock'
import SettingsIcon from '@material-ui/icons/Settings'

import LINKS from 'utils/constants/links'
import { useRoutes } from 'contexts/router-context'
import { useAccount } from 'contexts/account-context'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    boxShadow: '0 2px 12px 0 #bdbdbd',
  },
  item: {
    borderRadius: 4,
    color: theme.palette.text.primary,
  }
}));

const NavDropMenu = () => {
  const classes = useStyles();
  const { routePush } = useRoutes()
  const { onLock } = useAccount()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton
        aria-label='settings'
        edge='end'
        color='primary'
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <div>
          <MenuItem
            className={classes.item}
            onClick={() => routePush(LINKS.SETTING)}
          >
            <ListItemIcon>
              <SettingsIcon fontSize='small' />
            </ListItemIcon>
            Setting
          </MenuItem>
          <MenuItem
            className={classes.item}
            onClick={() => onLock()}
          >
            <ListItemIcon>
              <LockIcon fontSize='small' />
            </ListItemIcon>
            Lock
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default memo(NavDropMenu);