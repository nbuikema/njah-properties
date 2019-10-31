import React from 'react';

import Footer from './Footer';

const Home = () => (
    <div>
        <div className='home fixed'></div>
        <div className='w-100 text-center'>
            <h1 className='home-header'>
                NJAH Properties
            </h1>
            <h2 className='home-header home-header2'>
                <em>Welcome Home</em>
            </h2>
        </div>
        <div className='fixed-bottom'>
            <Footer />
        </div>
    </div>
);

export default Home;