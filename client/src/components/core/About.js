import React from 'react';

import house from './house.jpeg';
import allo from './allo.jpg';

const About = () => (
    <div className='text-primary my-5'>
        <div className='container'>
            <h1 className='text-center'>About Us</h1>
            <hr />
            <div className='row'>
                <div className='col-xs-12 col-sm-7 align-self-center'>
                    <h2>Who Are We?</h2>
                    <br className='d-block d-sm-none' />
                    <img className='d-block d-sm-none about-imgs' src={house} />
                    <br />
                    <p>
                        NJAH Properties is a privately owned group of properties offering comfortable, well-maintained accommodations to our tenants. We aim to provide quality living at an affordable, friendly environment. As a testament to this, most of our tenants have been with us for 2-15 years. Our team will work with you to provide you with the best living environment. We are a pet friendly property company. We look forward to working with you, if you find that one of our available properties will satisfy your housing needs.
                    </p>
                </div>
                <div className='col-xs-12 col-sm-5'>
                    <img className='d-none d-sm-block about-imgs' src={house} />
                </div>
            </div>
            <br /><br />
            <div className='row text-center'>
                <div className='col-12'>
                    <h2>Testimonials</h2>
                    <br />
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className='d-block w-100'>
                                    <h5>"Great property!"</h5>
                                    <h6><em>- Thomas B.</em></h6>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>"Great property!"</h5>
                                    <h6><em>- Tanya M.</em></h6>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>"Great property!"</h5>
                                    <h6><em>- George T.</em></h6>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className='row'>
                <div className='col-12'>
                    <h2>Meet The Management</h2>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col-xs-12 col-sm-6 border-right'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <img className='about-imgs' src={allo} />
                        </div>
                        <div className='col-xs-12 col-sm-6 text-right align-self-center'>
                            <h4 className='mb-0'>Dr. Simon Allo</h4>
                            <em>Landlord</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-xs-12 col-sm-6 border-left'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 align-self-center'>
                            <h4 className='mb-0'>Judy Zhu</h4>
                            <em>Office Manager</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                        <div className='col-xs-12 col-sm-6'>
                            <img className='about-imgs' src={allo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;