import React from 'react';

import house from './house.jpeg';
import allo from './allo.jpg';

const About = () => (
    <div className='text-primary my-5'>
        <div className='container'>
            <h1 className='text-center'>About Us</h1>
            <hr />
            <div className='row'>
                <div className='col-7 align-self-center'>
                    <h2>Who Are We?</h2>
                    <br />
                    <p>
                        NJAH Properties is a privately owned group of properties offering comfortable, well-maintained accommodations to our tenants. We aim to provide quality living at an affordable, friendly environment. As a testament to this, most of our tenants have been with us for 2-15 years. Our team will work with you to provide you with the best living environment. We are a pet friendly property company. We look forward to working with you, if you find that one of our available properties will satisfy your housing needs.
                    </p>
                </div>
                <div className='col-5'>
                    <img className='about-imgs' src={house} />
                </div>
            </div>
            <br /><br />
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>Meet The Management</h2>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-6'>
                            <img className='about-imgs' src={allo} />
                        </div>
                        <div className='col-6 text-right align-self-center'>
                            <h4 className='mb-0'>Dr. Simon Allo</h4>
                            <em>Owner</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-6'>
                            <img className='about-imgs' src={allo} />
                        </div>
                        <div className='col-6 text-right align-self-center'>
                            <h4 className='mb-0'>Dr. Simon Allo</h4>
                            <em>Owner</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className='row text-center'>
                <div className='col-12'>
                    <h2>Testimonials</h2>
                    <br />
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div className='d-block w-100'>
                                    <h5>Thomas</h5>
                                    <em>Great property!</em>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>George</h5>
                                    <em>Great property!</em>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>Pablo</h5>
                                    <em>Great property!</em>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;