import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import User from '../User/User';
import Footer from '../Footer';

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      {
        loggedInUser ?
          <User /> :
          <div className="loginRegister">
            <Link to="/">
              <div className="logo"></div>
            </Link>
            <div className='formsBtns'>
              <Link to='/login' className='login'>Login</Link>
              <Link to='/register' className='register'>Register</Link>
            </div>
          </div>
      }
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
