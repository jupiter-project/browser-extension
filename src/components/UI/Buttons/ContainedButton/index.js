
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 15,
    fontWeight: 'bold',
    boxShadow: 'none',
    borderRadius: 4,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  icon: {
    display: 'flex',
    marginRight: theme.spacing(1.5)
  },
  disabled: {
    opacity: 0.6,
    color: `${theme.palette.primary.main} !important`,
  }
}));

const ContainedButton = React.forwardRef(({
  className,
  classes: propClasses = {},
  color = 'primary',
  href,
  loading,
  disabled,
  icon,
  children,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <Button
      ref={ref}
      href={href}
      className={clsx(className, classes.root)}
      classes={{
        ...propClasses,
        disabled: classes.disabled
      }}
      color={color}
      variant='contained'
      disabled={loading || disabled}
      {...rest}
    >
      {
        !!icon &&
        <div className={classes.icon}>
          {icon}
        </div>
      }
      {children}
    </Button>
  );
});

export default memo(ContainedButton);
