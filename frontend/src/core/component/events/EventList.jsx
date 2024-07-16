import React from 'react';
import { useNavigate } from 'react-router';
import CreateEvent from './CreateEvent';
import { Roles } from '../../constants';
import StudentEvent from './StudentEvent';
import EventTable from './EventTable';
import getCurrentProfile from '../../utils/current-profile';
import { Row } from 'react-bootstrap';

function EventList({
  events, 
  onDelete, 
  onShowModal, 
  show ,
  onClose, 
  state,
   validated, 
   onChange, 
   onSubmit, 
   onHandleMakeEventReservation,
   onHandleRemoveEventReservation
  }) {
  const navigate = useNavigate();
  const profile = getCurrentProfile();

  const onShowDetails = (id) => {
      navigate(`/events/${id}`)
  }

  const onShowAttendees = (id) => {
    navigate(`/event-attendees/${id}`)
  }
    if(events && events.length === 0) return <Row className='d-flex justify-content-center p-5'>No Events Available</Row>
    return (
      <>
       <h3 className='d-flex justify-content-center'>Events</h3>
       {profile.role === Roles.STUDENT ? (
         <Row className="justify-content-start">
         { 
         events && events.map(event =>
          { 
            const rsvp = event.attendedStudents.find(a => a.username === profile.user)
          return ( <StudentEvent
           event={event} 
           key={event.id} 
           onHandleMakeEventReservation={onHandleMakeEventReservation}
           onHandleRemoveEventReservation={onHandleRemoveEventReservation}
           isRsvped={rsvp ? true : false}
           />)})
         }
          </Row>
        
        ) : (
          <>
          <EventTable events={events} onDelete={onDelete} onShowModal={onShowModal} onShowDetails={onShowDetails} onShowAttendees={onShowAttendees}/>
          <CreateEvent onClose={onClose} show={show} state={state} validated={validated} 
          onChange={onChange} onSubmit={onSubmit}/> 
          </>
        )}
      
   
      </>
    )
}

export default EventList
