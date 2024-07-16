import React, { useState, useEffect } from 'react';
import StudentEvent from './StudentEvent';
import getCurrentProfile from '../../utils/current-profile';
import { getStudentEventsApi } from '../../../service/eventsAPI';
import { Roles } from '../../constants';
import { Row, Stack } from 'react-bootstrap';
import NavBar from '../NavBar';

function UserEvents() {
    const profile = getCurrentProfile();
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        getStudentEvents()
    })
    const getStudentEvents = async () => {
        const data = await getStudentEventsApi();
        setUserEvents(data);

    }

    if(userEvents.length === 0) return <Row className='d-flex justify-content-center p-5'>No Personal Events</Row>

    return (
        <>
         <NavBar />
         <h3 className='d-flex justify-content-center p-5'> My Events</h3>
       { profile.role === Roles.STUDENT && (
            <Row className="justify-content-start">
            { 
            userEvents && userEvents.map(event =>
             { 
             return (
             <StudentEvent
              event={event} 
              key={event.id} 
              isRsvped={true}
              userEvent
              />)})
            }
            </Row>)}
             </>
    )
}

export default UserEvents
