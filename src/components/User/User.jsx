import UserContext from "../../context/UserContext"; import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

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
        <Link to="/addQuestions">Add New Post</Link>
        <div className="userPart">
          <img
            src={loggedInUser.avatar}
            alt="user avatar" 
            className="userAvatar"
          />
          <span>{loggedInUser.userName}</span>
       
        <button className="logOut" onClick={() => logOutUser()}>Log Out</button>
        </div>
        
      </div>
  );
}
export default User;