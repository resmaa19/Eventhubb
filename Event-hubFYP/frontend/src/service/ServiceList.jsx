import React from 'react'
import ServiceCard from "./ServiceCard";
import {Row, Col} from "reactstrap";






import partyImg from '../assets/images/party.jpg'
import ringImg from '../assets/images/ring.png'
import concertImg from '../assets/images/concert.png'

const serviceData = [
    {
    imgUrl : partyImg,
    title :"Private Parties",
    desc: "Milestone Birthdays Themed Events Special Celebrations Children/Teen Parties Seasonal Celebrations Party Venues",
    },

    {
    imgUrl : ringImg,
    title :"Weddings",
    desc: "Full Wedding Service Partial Wedding Planning Wedding Day Management Unique Venues Wedding Design",
    },

    {
    imgUrl : concertImg,
    title :"Concerts",
    desc: "Venue Management Concert Day Management Event Creation",
    },
        


];
const ServiceList = () => {
  return (
    <Row>
            {serviceData.map((item, index) => (
                <Col lg="4" key={index} style={{ padding: '0.5rem' }}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </Row>
  );
  };

export default ServiceList