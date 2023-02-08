import { useContext, useState } from "react";
import AnswerContext from "../../context/AnswerContext";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";

const Answers = () => {
  const [answerInputs, setAnswerInputs] = useState({
    answer: ""
  })
  const {questions} = useContext(QuestionContext);
  const {users, loggedInUser} =useContext(UserContext);
  const {answers, addAnswer} = useContext(AnswerContext)
    
  
  
  const handleAnswer = (e) => {
    e.preventDefault();
    const newAnswer={
      answer: answerInputs.answer,
      id: Date.now(),
      userId: loggedInUser ? loggedInUser.id : null,
    };
    addAnswer(newAnswer);
    setAnswerInputs({ answer: "" });
  };
    return (
      <div className="user">
          <img
            className="avatar"
            src={users.avatar}
            alt="user avatar" />
        {users && <span>{users.userName}</span>}

        <div className="question-text">{questions.title}</div>
        <div className="question-text">{questions.question}</div>
        {loggedInUser && (
          <form onSubmit={handleAnswer}>
            <input 
            type="text"
            value={answerInputs.answer}
            onChange={e => setAnswerInputs({ answer: e.target.value })} />
          <button type="submit" >Submit Answer</button>
  
          
          </form>
        )}
      </div>
    );
}
 
export default Answers;