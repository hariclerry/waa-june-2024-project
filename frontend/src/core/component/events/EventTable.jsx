import React from 'react';
import {Table, Button} from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function EventTable({events, onShowModal, onDelete, onShowDetails, onShowAttendees}) {
    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            { events && events.map( event => 
                <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td><FaRegEdit color='green' onClick={() => onShowModal(event, 'Edit')}/></td>
                <td><MdDeleteForever color='red' size={20} onClick={() => onDelete(event.id)}/></td>
                <td><Button variant="link" onClick={() => onShowDetails(event.id)}>Details</Button></td>
                <td><Button variant="link" onClick={() => onShowAttendees(event.id)}>Show Attendees</Button></td>
                </tr>
            )}
        </tbody>
      </Table>
    )
}

export default EventTable
