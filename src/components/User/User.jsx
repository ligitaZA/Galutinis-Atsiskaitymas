import UserContext from "../../context/UserContext"; import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
  const { setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    navigation('/');
  }

  return (
    <div className="headerUser">
      <div className="homePart">
        <div className="logo"></div>
        <Link to="/">HOME
        </Link>
      </div>
        <button className="logOut" onClick={() => logOutUser()}>Log Out</button>
      </div>
  );
}
export default User;