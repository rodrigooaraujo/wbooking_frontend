import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import New from './pages/new';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/new" component={New}></Route>
            </Switch>
        </BrowserRouter>
    )
}