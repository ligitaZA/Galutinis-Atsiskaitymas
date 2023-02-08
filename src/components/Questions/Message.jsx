// import React from "react";
// import UserContext from "../../context/UserContext";
// import { useContext } from "react";
// import QuestionContext from "../../context/QuestionContext";

// const Message = () => {
//   const { messages } = useContext(QuestionContext);
//   const { users, loggedInUser } = useContext(UserContext);


//   const messageOwner =
//     users.find((user) => user.id === messages.userId) || {};

//   return (
//     <div className="user">
//       {messageOwner && (
//         <img
//           className="avatar"
//           src={messageOwner.avatar}
//           alt="user avatar" />
//       )}
//       {messageOwner && <span>{messageOwner.userName}</span>}
//       <div className="question-text">{messages.title}</div>
//       <div className="question-text">{messages.question}</div>
//     </div>
//   );
// };

// export default Message;