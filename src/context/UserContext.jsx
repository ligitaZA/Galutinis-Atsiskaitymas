import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      }).catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const addNewUser = (newUser) => {
    setUsers([...users, newUser]);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        addNewUser,
        loggedInUser,
        setLoggedInUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;