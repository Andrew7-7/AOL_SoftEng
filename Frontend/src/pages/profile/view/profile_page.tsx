import { useNavigate } from 'react-router-dom';
import StudentNav from '../../../global/components/navbar/student/student_navbar';
import logout from '../controller/logout';
import './profile_css.css'
const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <StudentNav />
      <div>Profile</div>
      <button onClick={()=>logout(navigate)}>Logout</button>
    </>
  );
};

export default ProfilePage;
