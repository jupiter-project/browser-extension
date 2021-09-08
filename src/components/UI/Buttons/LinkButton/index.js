
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

import { useRoutes } from 'contexts/router-context';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'unset',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}));

const LinkButton = ({
  className,
  href,
  onClick = () => { },
  children
}) => {
  const classes = useStyles();
  const { routePush } = useRoutes()

  const clickHandler = () => {
    if (!!href) {
      routePush(href);
      return
    }

    onClick()
  }
  return (
    <Typography
      className={clsx(classes.root, className)}
      onClick={clickHandler}
    >
      {children}
    </Typography>
  )
};

export default memo(LinkButton);