import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/signin' exact component={Signin} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;