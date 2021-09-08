
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

import { useRoutes } from 'contexts/router-context';
import Logo from 'components/Logo'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LINKS from 'utils/constants/links';
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    marginBottom: theme.spacing(5)
  },
  description: {
    margin: theme.spacing(3, 0)
  }
}));

const Welcome = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()

  const { routePush } = useRoutes()

  return (
    <main className={classes.root}>
      <div className={clsx(classes.container, commonClasses.containerWidth)}>
        <Logo
          size={80}
          className={classes.logo}
        />
        <Typography variant='h5' align='center'>
          Welcome to JupMask
        </Typography>
        <Typography className={classes.description} align='center'>
          Connecting you to Jupiter and the Decentralized Web.
          <br />
          We’re happy to see you.
        </Typography>
        <ContainedButton onClick={() => routePush(LINKS.SIGN_IN)}>
          Get Started
        </ContainedButton>
      </div>
    </main>
  )
}

export default memo(Welcome)