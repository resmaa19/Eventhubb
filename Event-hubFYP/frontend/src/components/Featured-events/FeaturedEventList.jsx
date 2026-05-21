import React from 'react';
import EventCard from '../../share/EventCard';
import { Col } from 'reactstrap';
import useFetch from './../../hooks/useFetch';
import { BASE_URL } from './../../utils/config';

const FeaturedEventList = () => {
  const { data: featuredevents } = useFetch(`${BASE_URL}/events`);
  console.log(featuredevents);
  
  return (
    <>
      {featuredevents.map(event => (
        <Col lg='3' className='mb-4' key={event.id}>
          <EventCard event={event} />
        </Col>
      ))}
    </>
  );
}

export default FeaturedEventList;
