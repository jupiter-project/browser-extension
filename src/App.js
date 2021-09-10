import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useRoutes } from 'contexts/router-context';
import MagicLoading from 'components/MagicLoading';
import LINKS from 'utils/constants/links';
import theme from 'styles/theme'

const Welcome = lazy(() => import('containers/Welcome'))
const SignIn = lazy(() => import('containers/Auth/SignIn'))
const SignUp = lazy(() => import('containers/Auth/SignUp'))
const MyAccount = lazy(() => import('containers/MyAccount'))
const Setting = lazy(() => import('containers/Setting'))
const SendJup = lazy(() => import('containers/SendJup'))
const SendAsset = lazy(() => import('containers/SendAsset'))

function App() {
  const { currentRouter } = useRoutes()

  const view = () => {
    switch (currentRouter) {
      case LINKS.WELCOME: return <Welcome />
      case LINKS.SIGN_IN: return <SignIn />
      case LINKS.SIGN_UP: return <SignUp />
      case LINKS.MY_ACCOUNT: return <MyAccount />
      case LINKS.SETTING: return <Setting />
      case LINKS.SEND_JUP: return <SendJup />
      case LINKS.SEND_ASSET: return <SendAsset />
      default: return <Welcome />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<MagicLoading loading={true} />}>
        {view()}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
