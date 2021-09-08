
import { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Logo from 'components/Logo'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(5, 2)
  },
  logo: {
    marginBottom: theme.spacing(2)
  },
  welcome: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(4)
  }
}));

const authPageStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginBottom: theme.spacing(2.5)
  },
  button: {
    margin: theme.spacing(2.5)
  }
}));

const AuthWrapper = ({
  children
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />
      <Typography
        align='center'
        variant='h6'
        color='primary'
        className={classes.welcome}
      >
        Welcome to JupMask!
      </Typography>
      {children}
    </div>
  )
}

export { authPageStyles };
export default memo(AuthWrapper);