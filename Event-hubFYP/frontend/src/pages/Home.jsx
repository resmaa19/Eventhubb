import React from 'react'
import '../styles/home.css'
import Subtitle from '../share/subtitle';

import {Container, Row,Col} from 'reactstrap';
import BannerImg from '../assets/images/Banner.png'
import logo from '../assets/images/logo.png';
import event from '../assets/images/event1.jpeg';

import ServiceList from '../service/ServiceList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';

const Home = () => { 
  return (
    <div className="home-container">
      <div className="banner-container" style={{ backgroundImage: `url(${BannerImg})` }}>
        <img src={logo} alt="Logo" className="event-hub-logo" />
      </div>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <h1 className="services_subtitle">events</h1>
            </Col>
          </Row>
        </Container>

        <ServiceList />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="image-container">
                <img src={event} alt="Event" className="event-image" />
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience_content">
                <div className="company-info">
                  <p>We are...</p>
                  <div className="separator">|</div>
                  <p>an event design, planning and <br/> creative consulting company</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'}/>
              <h2 className="gallery_title">Take a look at our Customers Experience</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery/>
              
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'User Reviews'} />
              <h2 className="testimonial_title"> What our users have to say about us </h2>
            </Col>
            <Col lg='12'>
              <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;


