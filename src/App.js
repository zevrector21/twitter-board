import React, { useEffect, useState } from 'react';
import Admin from "./pages/Admin";
import './pages/index.scss';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Layout, notification } from "antd";
import "antd/dist/antd.css";
import { createStore } from './store';


createStore({
  initialState: {
    currentUser: null,
  },
})

const basename = '/';

const history = createBrowserHistory({
  basename
});

function App (props) {

  const openNotification = (status, message) => {
    if (status) {
      notification.success({
        message: message,
        placement: 'topRight',
      });
    }
    else {
      notification.error({
        message: message,
        placement: 'topRight',
      });
    }
  };

  return (
    <BrowserRouter basename={basename} history={history}>
      <Switch>
        <Route path="/" exact component={Admin} />
        /*{<Route
          path="/admin/:menukey(users|preferences)"
          exact
          component={Admin} />}*/
      </Switch>
    </BrowserRouter>
  );
}

export default App;
