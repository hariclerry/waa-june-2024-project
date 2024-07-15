import React from 'react';
import NavBar from '../../core/component/NavBar';
import {useLocation} from 'react-router-dom';
import {Col, Container, Image, ListGroup, Row} from 'react-bootstrap';
import {API} from '../../core/constants';

export default function StudentDetail() {
  const location = useLocation();

  // Extracting student data from location.state
  const {
    username,
    firstName,
    lastName,
    email,
    birthDate,
    genderType,
    studentCode,
    academicYears,
    picture,
    achievements,
    interest,
    extraActivities,
    major
  } = location.state;

  return (
    <>
      <NavBar />
      <Container className="my-4">
        <h2>
          {firstName} {lastName}
        </h2>
        <Row>
          <Col md={4}>
            <Image src={API.baseURL + picture} alt={`${firstName} ${lastName}`} fluid />
          </Col>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Username:</strong> {username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Name:</strong> {firstName} {lastName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Date of Birth:</strong> {birthDate}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Gender:</strong> {genderType}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Student Code:</strong> {studentCode}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Academic Years:</strong> {academicYears}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Major:</strong> {major.name}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>Interests:</h5>
            <p>{interest.join(', ')}</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>Extra Activities:</h5>
            <p>{extraActivities.join(', ')}</p>
          </Col>
        </Row>
        {achievements.length > 0 && (
          <Row className="mt-4">
            <Col>
              <h5>Achievements:</h5>
              <ListGroup variant="flush">
                {achievements.map((achievement, index) => (
                  <ListGroup.Item key={index}>{achievement}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
