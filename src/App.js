import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LINKS from 'utils/constants/links'
import theme from 'styles/theme'

const Welcome = lazy(() => import('containers/Welcome'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={LINKS.WELCOME.HREF} component={Welcome} />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
