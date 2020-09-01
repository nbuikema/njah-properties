import React from 'react';

import house from './house.jpeg';
import allo from './allo.jpg';

const About = () => (
    <div className='text-primary my-5'>
        <div className='container'>
            <h1 className='text-center'>About Us</h1>
            <hr />
            <div className='row'>
                <div className='col-md-12 col-lg-7 align-self-center'>
                    <p>
                        NJAH Properties is a privately owned group of properties offering comfortable, well-maintained accommodations to our tenants. We aim to provide quality living and an affordable, friendly environment. As a testament to this, most of our tenants have been with us for 2-15 years. Our team will work with you to provide the best living environment. We are a pet friendly property company. We look forward to working with you should you find that one of our available properties will satisfy your housing needs.
                    </p>
                </div>
                <div className='col-md-12 col-lg-5'>
                    <img className='about-imgs' src={house} />
                </div>
            </div>
            <br /><br /><br />
            <div className='row text-center'>
                <div className='col-12'>
                    <h2>Testimonials</h2>
                    <hr />
                    <div id="carouselExampleControls" className="carousel slide testimonials" data-ride="carousel" data-interval="12000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className='d-block w-100'>
                                    <h5>"Very courteous! Respond very quickly and direct. Thank you for providing a great residence for my son during his time in college."</h5>
                                    <h6><em>- Thomas B.</em></h6>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>"Dr. Allo is very thorough and professional. I very much enjoyed my stay with NJAH Properties. Judy is always available to help no matter what the reason is."</h5>
                                    <h6><em>- Tanya M.</em></h6>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-block w-100'>
                                    <h5>"Very friendly staff. Helped find me the perfect home in just days. Highly recommended!"</h5>
                                    <h6><em>- George T.</em></h6>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev testimonials-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next testimonials-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
            {/*
            <br /><br /><br />
            <div className='row'>
                <div className='col-12 text-center'>
                    <h2>Meet The Management</h2>
                    <hr />
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col-sm-12 col-md-6 border-right'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 align-self-center order-1 order-lg-0'>
                            <img className='about-imgs' src={allo} />
                        </div>
                        <div className='col-12 col-lg-6 text-right align-self-center order-0 order-lg-1'>
                            <h4 className='mb-0'>Dr. Simon Allo</h4>
                            <em>Landlord</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-6 border-left'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <h4 className='mb-0'>Judy Zhu</h4>
                            <em>Office Manager</em>
                            <br /><br />
                            <p>
                                I am personally involved in the evaluation, inspection and purchase of our properties. I am also involved in the redesign and modifications of existing properties to make sure they meet our high standards. Our new structures are similar designed to meet the high expectations of our company.
                            </p>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <img className='about-imgs' src={allo} />
                        </div>
                    </div>
                </div>
            </div>
            */}
        </div>
    </div>
);

export default About;