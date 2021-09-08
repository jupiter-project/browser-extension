
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/CallMade'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1)
  }
}));

const SendButton = ({
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <IconButton className={classes.iconButton} {...rest}>
        <SendIcon />
      </IconButton>
      <Typography
        variant='body2'
        align='center'
        color='primary'
      >
        Send
      </Typography>
    </div>
  )
};

export default memo(SendButton);