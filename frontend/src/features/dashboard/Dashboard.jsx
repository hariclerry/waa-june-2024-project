import {useNavigate} from 'react-router';
import getCurrentProfile from '../../core/utils/current-profile';
import {Roles} from '../../core/constants';
import StudentDashboard from './dashboard-student';
import AdminDashboard from './dashboard-admin';
import {useEffect} from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const profile = getCurrentProfile();

  useEffect(() => {
    if (profile === null || profile === undefined) {
      navigate('/login');
    }
  }, [profile, navigate]);

  return <>
   <h5 className='d-flex justify-content-end m-4'>Welcome {profile.user}</h5>
  {profile && profile.role === Roles.ADMIN ? <AdminDashboard /> : <StudentDashboard />}
  </>;
}
