import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router';
import {Roles, State} from '../../core/constants';
import ErrorDialog from '../../core/component/dialogs/ErrorDialog';
import apiClient from '../../core/setup/axios';
import NavBar from '../../core/component/NavBar';
import StudentCard from './student-card/student-card';
import getCurrentProfile from '../../core/utils/current-profile';

const Students = () => {
  const [studentsData, setStudentsData] = useState({
    content: [],
    page: {
      size: 10,
      number: 0,
      totalElements: 0,
      totalPages: 0
    }
  });

  const [studentsState, setStudentsState] = useState({
    status: State.IDLE,
    error: null
  });

  const navigate = useNavigate();
  const profile = getCurrentProfile();

  if (profile === null || profile === undefined) {
    navigate('/login');
  }

  const fetchStudents = async (pageNumber = 0) => {
    setStudentsState({...studentsState, status: State.LOADING});

    var studentsUrl;

    try {
      if (profile.role === Roles.ADMIN) {
        studentsUrl = `/admins/students?page=${pageNumber}`;
      } else {
        studentsUrl = `/students?page=${pageNumber}`;
      }

      const response = await apiClient.get(studentsUrl);
      setStudentsData(response.data);
      setStudentsState({...studentsState, status: State.SUCCEEDED});
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login');
      } else {
        setStudentsState({
          status: State.FAILED,
          error: 'Something went wrong. Please try again later.'
        });
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handlePageChange = pageNumber => {
    fetchStudents(pageNumber);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center min-vh-100 m-4">
          <Col md="8">
            <h2 className="text-center">Students</h2>
            {studentsState.status === State.LOADING ? (
              <Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Row>
                {studentsData.content.map(student => (
                  <Col key={student.username} md={6} lg={4}>
                    <StudentCard student={student} />
                  </Col>
                ))}
              </Row>
            )}
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="outline-primary"
                disabled={studentsData.page.number === 0}
                onClick={() => handlePageChange(studentsData.page.number - 1)}
              >
                Previous
              </Button>
              <span>
                Page {studentsData.page.number + 1} of {studentsData.page.totalPages}
              </span>
              <Button
                variant="outline-primary"
                disabled={studentsData.page.number >= studentsData.page.totalPages - 1}
                onClick={() => handlePageChange(studentsData.page.number + 1)}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>
        <ErrorDialog
          show={studentsState.status === State.FAILED}
          errorMessage={studentsState.error}
          handleClose={() => {
            setStudentsState({...studentsState, status: State.IDLE});
          }}
        />
      </Container>
    </>
  );
};

export default Students;
