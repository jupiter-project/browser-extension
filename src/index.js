import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotifyProvider } from 'contexts/notify-context'
import { MainAssetProvider } from 'contexts/asset-context'
import { RoutesProvider } from 'contexts/router-context';
import { AccountProvider } from 'contexts/account-context';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <NotifyProvider>
      <AccountProvider>
        <RoutesProvider>
          <MainAssetProvider>
            <App />
          </MainAssetProvider>
        </RoutesProvider>
      </AccountProvider>
    </NotifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();