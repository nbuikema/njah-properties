import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Properties from './components/properties/Properties';
import Property from './components/properties/Property';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import UserDashboard from './components/users/UserDashboard';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/properties' exact component={Properties} />
                    <Route path='/properties/:propertyId' exact component={Property} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/signin' exact component={Signin} />
                    <PrivateRoute path='/dashboard' exact component={UserDashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;