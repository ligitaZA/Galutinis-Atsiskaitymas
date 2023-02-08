// import { useContext } from "react";
// import QuestionContext from "../../context/QuestionContext";
// import UserContext from "../../context/UserContext";
// import Chat from "./NewChatForm";


// const Questions = () => {
//   const { questions } = useContext(QuestionContext);
//   const { users } = useContext(UserContext);
//   if (!questions || !users) {
//     return <div>Loading...</div>
//   }
  
//   return (
//     <>
//       <div>
//         {
//           questions.map(message =>
//             <Chat
//               key={ message.id}
//               data={message} 
//               />
//           )
//         }
//       </div>
//     </>);
// }

// export default Questions;