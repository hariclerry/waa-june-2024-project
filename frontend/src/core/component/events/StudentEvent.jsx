import React from 'react';
import { MdRsvp } from "react-icons/md";
import {Card, Stack, Button} from 'react-bootstrap';

function StudentEvent({event, onHandleMakeEventReservation, onHandleRemoveEventReservation, isRsvped, userEvent}) {
    return (
        <>
        <Card style={{ width: '25rem' }} className="mx-auto my-4">
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Stack direction="horizontal" gap={3}>
          <Card.Text>
            Date:
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{event.eventDate} </Card.Subtitle>
          </Stack>
          <Stack direction="horizontal" gap={3}>
          <Card.Text>
            Time:
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{event.eventTime} </Card.Subtitle>
          </Stack>
          <Card.Text>
            {event.description}
          </Card.Text>
          {/* <Card.Link href="#" onClick={() => navigate("/events")}>Back</Card.Link>
          <Button variant="link" onClick={() => onShowDetails(event.id)}>Details</Button>
           */}
            { !userEvent && (
            isRsvped ?
          <Button variant="link" onClick={() =>  onHandleRemoveEventReservation(event.id)}>  <MdRsvp color='green' size={40}/>
           </Button> :
           <Button variant="link" onClick={() => onHandleMakeEventReservation(event.id)}>
           <MdRsvp color='orange' size={40}/>
           </Button>
           )}
        </Card.Body>
      </Card>
       </>
    )
}

export default StudentEvent
