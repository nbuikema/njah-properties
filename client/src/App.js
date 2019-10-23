import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Secret from './components/auth/Secret';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/signin' exact component={Signin} />
                    <PrivateRoute path='/secret' exact component={Secret} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;