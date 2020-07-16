import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/core/Navbar';
import Home from './components/core/Home';
import About from './components/core/About';
import Contact from './components/core/Contact';
import Properties from './components/properties/Properties';
import Property from './components/properties/Property';
import Signin from './components/auth/Signin';
import ForgotPassword from './components/auth/ForgotPassword';
import UserDashboard from './components/users/UserDashboard';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' exact component={About} />
                    <Route path='/contact' exact component={Contact} />
                    <Route path='/properties' exact component={Properties} />
                    <Route path='/properties/:propertyId' exact component={Property} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/password/reset' exact component={ForgotPassword} />
                    <PrivateRoute path='/dashboard' exact component={UserDashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;