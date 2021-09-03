
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCommonStyles } from 'styles/use-styles'
import clsx from 'clsx'

import Logo from 'components/Logo'
import { Typography } from '@material-ui/core'
import ContainedButton from 'components/UI/Buttons/ContainedButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    margin: theme.spacing(3, 0)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    margin: theme.spacing(5, 0)
  },
  description: {
    margin: theme.spacing(2, 0)
  }
}));

const Welcome = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()

  return (
    <main className={classes.root}>
      <div className={clsx(classes.container, commonClasses.containerWidth)}>
        <Logo
          size={80}
          className={classes.logo}
        />
        <Typography variant='h5'>
          Welcome to JupMask
        </Typography>
        <Typography className={classes.description} align='center'>
          Connecting you to Jupiter and the Decentralized Web.
          <br />
          We’re happy to see you.
        </Typography>
        <ContainedButton>
          Get Started
        </ContainedButton>
      </div>
    </main>
  )
}

export default memo(Welcome)