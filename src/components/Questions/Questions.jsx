import { useContext } from "react";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";
import Chat from "./NewChatForm";


const Questions = () => {
  const { messages } = useContext(QuestionContext);
  const { users } = useContext(UserContext);
  if (!messages || !users) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <div>
        {
          messages.map(message =>
            <Chat
              key={ message.id}
              data={message} 
              />
          )
        }
      </div>
    </>);
}

export default Questions;